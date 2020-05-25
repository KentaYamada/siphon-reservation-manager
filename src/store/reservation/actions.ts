import { ActionTree } from "vuex";

// entity
import { Reservation } from "@/entity/reservation";
import { ReservationSeat } from "@/entity/reservation-seat";
import { ReservationSearchOption } from "@/entity/reservation-search-option";
import { ReservationSeatSearchOption } from "@/entity/reservation-seat-search-option";

// plugin
import _ from "lodash";
import firebase from "@/plugins/firebase";

// store
import { RootState } from "@/store";
import { ReservationState } from "@/store/reservation";
import {
  CANCEL,
  FETCH,
  FETCH_BY_ID,
  FETCH_RESERVATION_SEATS,
  SAVE,
  SAVE_ALL_RESERVATION,
  SET_ITEM,
  SET_ITEMS,
  SET_RESERVATION_SEATS
} from "@/store/constant";

// firestore collection name
const COLLECTION_NAME = "reservations";
const RESERVATION_SEATS_COLLECTION = "reservation_seats";

const actions: ActionTree<ReservationState, RootState> = {
  /**
   * 予約一覧取得
   * @param options
   */
  [FETCH]: async ({ commit }, options: ReservationSearchOption) => {
    const collection = firebase.firestore().collection(COLLECTION_NAME);
    const query = collection.where(
      "reservation_date_id",
      "==",
      options.reservation_date_id
    );

    const $promise = query.get().then(querySnapshot => {
      let items: Reservation[] = [];

      querySnapshot.forEach(doc => {
        const data = doc.data();
        const item: Reservation = {
          id: doc.id,
          reservation_date: data.reservation_date.toDate(),
          reservation_date_id: data.reservation_date_id,
          reservation_start_time: data.reservation_start_time.toDate(),
          reservation_end_time: data.reservation_end_time.toDate(),
          reservation_time_id: data.reservation_time_id,
          reserver_name: data.reserver_name,
          reservation_seats: [],
          number_of_reservations: data.number_of_reservations,
          tel: data.tel,
          mail: data.mail,
          comment: data.comment
        };

        items.push(item);
      });

      if (options.reservation_time_id !== "") {
        // 予約時間
        items = _.filter(items, (item: Reservation) => {
          return item.reservation_time_id === options.reservation_time_id;
        });
      }

      // sort
      items = _.orderBy(
        items,
        ["reservation_date_id", "reservation_timezone_id"],
        ["desc", "asc"]
      );

      commit(SET_ITEMS, items);
    });

    return await $promise;
  },

  [FETCH_RESERVATION_SEATS]: async (
    { commit },
    options: ReservationSeatSearchOption
  ) => {
    const collection = firebase
      .firestore()
      .collection(RESERVATION_SEATS_COLLECTION);
    const $promise = collection.get().then(query => {
      let items: ReservationSeat[] = [];

      query.forEach(doc => {
        const data = doc.data();
        const item: ReservationSeat = {
          id: doc.id,
          seat_no: data.seat_no,
          is_reserved: data.is_reserved,
          is_selected: false,
          reservation_id: data.reservation_id,
          reservation_date: data.reservation_date.toDate(),
          reservation_date_id: data.reservation_date_id,
          reservation_start_time: data.reservation_start_time.toDate(),
          reservation_end_time: data.reservation_end_time.toDate(),
          reservation_time_id: data.reservation_time_id
        };

        items.push(item);
      });

      if (options.reservation_id) {
        items = _.filter(items, (item: ReservationSeat) => {
          return item.reservation_id === options.reservation_id;
        });
      }

      if (options.reservation_date_id) {
        items = _.filter(items, (item: ReservationSeat) => {
          return item.reservation_date_id === options.reservation_date_id;
        });
      }

      if (options.reservation_time_id) {
        items = _.filter(items, (item: ReservationSeat) => {
          return item.reservation_time_id === options.reservation_time_id;
        });
      }

      items = _.orderBy(items, ["seat_no"], ["asc"]);

      if (items.length > 0) {
        commit(SET_RESERVATION_SEATS, items);
      }
    });

    return await $promise;
  },

  /**
   * 予約情報取得
   * @param id
   */
  [FETCH_BY_ID]: async ({ commit }, id: string) => {
    if (!id) {
      return Promise.reject("id cannot be empty");
    }

    const db = firebase.firestore();
    const reservations = db.collection(COLLECTION_NAME);

    return await reservations
      .doc(id)
      .get()
      .then(doc => {
        const data = doc.data();

        if (!data) {
          return Promise.reject("Failed reservation.");
        }

        const reservation: Reservation = {
          id: id,
          reservation_date: data.reservation_date.toDate(),
          reservation_date_id: data.reservation_date_id,
          reservation_start_time: data.reservation_start_time.toDate(),
          reservation_end_time: data.reservation_end_time.toDate(),
          reservation_time_id: data.reservation_time_id,
          reserver_name: data.reserver_name,
          reservation_seats: [],
          number_of_reservations: data.number_of_reservations,
          tel: data.tel,
          mail: data.mail,
          comment: data.comment
        };

        commit(SET_ITEM, reservation);

        const reservationSeats = db.collection(RESERVATION_SEATS_COLLECTION);
        const query = reservationSeats
          .where("reservation_date_id", "==", data.reservation_date_id)
          .where("reservation_time_id", "==", data.reservation_time_id);

        return query.get().then(querySnapshot => {
          let items: ReservationSeat[] = [];

          querySnapshot.forEach(doc => {
            const data = doc.data();
            const isMyReservation = id === data.reservation_id;
            const isSelected = isMyReservation && data.is_reserved;
            const isReserved = !isMyReservation && data.is_reserved;
            const item: ReservationSeat = {
              id: doc.id,
              seat_no: data.seat_no,
              is_reserved: isReserved,
              is_selected: isSelected,
              reservation_id: data.reservation_id,
              reservation_date: data.reservation_date.toDate(),
              reservation_date_id: data.reservation_date_id,
              reservation_start_time: data.reservation_start_time,
              reservation_end_time: data.reservation_end_time,
              reservation_time_id: data.reservation_time_id
            };

            items.push(item);
          });

          items = _.orderBy(items, ["seat_no"], ["asc"]);
          commit(SET_RESERVATION_SEATS, items);
        });
      });
  },

  /**
   * 予約登録
   * @param reservation
   */
  [SAVE]: async ({ commit }, reservation: Reservation) => {
    const db = firebase.firestore();
    const reservationSeats = db.collection(RESERVATION_SEATS_COLLECTION);
    const selectedSeatNo: number[] = [];

    _.each(reservation.reservation_seats, (seat: ReservationSeat) => {
      if (seat.is_selected) {
        selectedSeatNo.push(seat.seat_no);
      }
    });

    const query = reservationSeats
      .where("reservation_date", "==", reservation.reservation_date)
      .where("reservation_time_id", "==", reservation.reservation_time_id)
      .where("is_reserved", "==", true)
      .where("seat_no", "array-contains", selectedSeatNo);

    return await query.get().then(querySnapshot => {
      if (!querySnapshot.empty) {
        return Promise.reject();
      }

      const $transaction = db.runTransaction(async transaction => {
        const reservations = db.collection(COLLECTION_NAME);
        const reservationRef = reservation.id
          ? reservations.doc(reservation.id)
          : reservations.doc();

        return await transaction.get(reservationRef).then(doc => {
          const reservationData = {
            reservation_date: reservation.reservation_date,
            reservation_date_id: reservation.reservation_date_id,
            reservation_start_time: reservation.reservation_start_time,
            reservation_end_time: reservation.reservation_end_time,
            reservation_time_id: reservation.reservation_time_id,
            reserver_name: reservation.reserver_name,
            number_of_reservations: reservation.number_of_reservations,
            tel: reservation.tel,
            mail: reservation.mail,
            comment: reservation.comment
          };

          if (doc.exists) {
            transaction.update(reservationRef, reservationData);
          } else {
            transaction.set(reservationRef, reservationData);
          }

          const query = reservationSeats
            .where("reservation_date", "==", reservation.reservation_date)
            .where(
              "reservation_time_id",
              "==",
              reservation.reservation_time_id
            );

          return query.get().then(querySnapshot => {
            querySnapshot.forEach(doc => transaction.delete(doc.ref));

            _.each(reservation.reservation_seats, (seat: ReservationSeat) => {
              let reservationId = null;
              let isReserved = null;

              if (seat.is_reserved) {
                reservationId = seat.reservation_id;
                isReserved = seat.is_reserved;
              } else {
                if (seat.is_selected) {
                  reservationId = seat.reservation_id
                    ? seat.reservation_id
                    : reservationRef.id;
                  isReserved = true;
                }
              }

              const seatRef = reservationSeats.doc();
              const seatData = {
                seat_no: seat.seat_no,
                is_reserved: isReserved,
                reservation_id: reservationId,
                reservation_date: reservation.reservation_date,
                reservation_date_id: reservation.reservation_date_id,
                reservation_start_time: reservation.reservation_start_time,
                reservation_end_time: reservation.reservation_end_time,
                reservation_time_id: reservation.reservation_time_id
              };

              transaction.set(seatRef, seatData);
            });

            return reservationRef.id;
          });
        });
      });

      return $transaction;
    });
  },

  /**
   * 貸切データ登録
   */
  [SAVE_ALL_RESERVATION]: async ({ commit }, reservation: Reservation): Promise<string> => {
    const db = firebase.firestore();
    const reservations = db.collection(COLLECTION_NAME);

    // 予約データが無いかチェック
    const query = reservations
      .where("reservation_date_id", "==", reservation.reservation_date_id)
      .where("reservation_time_id", "==", reservation.reservation_time_id);
    const hasItem = await query.get().then(querySnapshot => { return !querySnapshot.empty; });

    if (hasItem) {
      return Promise.reject();
    }

    const transaction = await db.runTransaction(async transaction => {
      const reservationRef = reservations.doc();
      const reservationData = {
        reservation_date: reservation.reservation_date,
        reservation_date_id: reservation.reservation_date_id,
        reservation_start_time: reservation.reservation_start_time,
        reservation_end_time: reservation.reservation_end_time,
        reservation_time_id: reservation.reservation_time_id,
        reserver_name: reservation.reserver_name,
        number_of_reservations: reservation.number_of_reservations,
        tel: reservation.tel,
        mail: reservation.mail,
        comment: reservation.comment
      };

      transaction.set(reservationRef, reservationData);

      const reservationSeats = db.collection(RESERVATION_SEATS_COLLECTION);

      _.each(reservation.reservation_seats, (seat: ReservationSeat) => {
        const seatRef = reservationSeats.doc();
        const seatData = {
          seat_no: seat.seat_no,
          is_reserved: true,
          reservation_id: reservationRef.id,
          reservation_date: reservation.reservation_date,
          reservation_date_id: reservation.reservation_date_id,
          reservation_start_time: reservation.reservation_start_time,
          reservation_end_time: reservation.reservation_end_time,
          reservation_time_id: reservation.reservation_time_id
        };

        transaction.set(seatRef, seatData);
      });

      return reservationRef.id;
    });

    return transaction;
  },

  /**
   * 予約取消
   * @param id
   */
  [CANCEL]: async ({ commit }, id: string) => {
    if (!id) {
      return Promise.reject("not found");
    }
    const db = firebase.firestore();
    const $transaction = db.runTransaction(async transaction => {
      const reservationRef = db.collection(COLLECTION_NAME).doc(id);

      return await transaction.get(reservationRef).then(doc => {
        if (!doc.exists) {
          return Promise.reject("reservation not found");
        }

        transaction.delete(reservationRef);

        const query = db
          .collection(RESERVATION_SEATS_COLLECTION)
          .where("reservation_id", "==", id);

        return query.get().then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const updateData = {
              is_reserved: false,
              reservation_id: null
            };
            transaction.update(doc.ref, updateData);
          });
        });
      });
    });

    return await $transaction;
  }
};

export default actions;
