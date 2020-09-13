import { ActionTree } from "vuex";
import _ from "lodash";
import { ReservationList } from "@/entity/reservation-list";
import { ReservationListSeat } from "@/entity/reservation-list-seat";
import { ReservationSearchOption } from "@/entity/reservation-search-option";
import { ReservationService } from "@/services/firestore/reservation-service";
import { ReservationSeatService } from "@/services/firestore/reservation-seat-service";
import { RootState } from "@/store";
import { FETCH, SET_ITEMS } from "@/store/constant";
import { ReservationListState } from "@/store/reservation-list";

const actions: ActionTree<ReservationListState, RootState> = {
  [FETCH]: async ({ commit }, option: ReservationSearchOption) => {
    const reservationService = new ReservationService();
    const reservationSeatService = new ReservationSeatService();
    const reservationsRef = await reservationService.fetch(option);
    const reservationSeatsRef = await reservationSeatService.fetch(option);
    const items: Array<ReservationList> = [];

    // 予約日時ごとのデータ作成
    reservationsRef.forEach(doc => {
      const data = doc.data();
      const item: ReservationList = {
        reservation_date: data.reservation_date?.toDate(),
        reservation_date_id: data.reservation_date_id,
        reservation_start_time: data.reservation_start_time?.toDate(),
        reservation_end_time: data.reservation_end_time?.toDate(),
        reservation_time_id: data.reservation_time_id,
        seats: []
      };
      // 座席データごとのデータセット
      item.seats = _.chain(reservationSeatsRef.docs)
        .filter(doc => {
          return (
            // doc.data().reservation_date_id === currentReservationDateId &&
            // doc.data().reservation_time_id === currentReservationTimeId
            doc.data().reservation_date_id === data.reservation_date_id &&
            doc.data().reservation_time_id === data.reservation_time_id
          );
        })
        .map(doc => {
          return {
            seat_no: doc.data().seat_no,
            reservation_id: doc.data().reservation_id,
            reserver_name: "",
            number_of_reservations: 0,
            mail: "",
            tel: "",
            comment: ""
          } as ReservationListSeat;
        })
        .orderBy(["seat_no"], ["asc"])
        .value();

      items.push(item);
    });

    // 座席ごとの予約データセット
    _.each(items, (item: ReservationList) => {
      _.each(item.seats, (seat: ReservationListSeat) => {
        const myReservation = _.find(reservationsRef.docs, doc => doc.id === seat.reservation_id);

        if (!_.isNil(myReservation)) {
          seat.reserver_name = myReservation.data().reserver_name;
          seat.number_of_reservations = myReservation.data().number_of_reservations;
          seat.mail = myReservation.data().mail;
          seat.tel = myReservation.data().tel;
          seat.comment = myReservation.data().comment;
        }
      });
    });

    // _.each(reservationsRef.docs, doc => {
    //   const data = doc.data();
    //   const isDiffReservationDate = currentReservationDateId !== data.reservation_date_id;
    //   const isDiffReservationTime = !isDiffReservationDate && currentReservationTimeId !== data.reservation_time_id;

    //   // if (!isDiffReservationDate || !isDiffReservationTime) {
    //   //   return;
    //   // }

    //   const item: ReservationList = {
    //     reservation_date: data.reservation_date?.toDate(),
    //     reservation_date_id: data.reservation_date_id,
    //     reservation_start_time: data.reservation_start_time?.toDate(),
    //     reservation_start_time_id: data.reservation_start_time_id,
    //     reservation_end_time: data.reservation_end_time?.toDate(),
    //     reservation_end_time_id: data.reservation_end_time_id,
    //     seats: []
    //   };

    //   // 座席データごとのデータセット
    //   item.seats = _.chain(reservationSeatsRef.docs)
    //     .filter(doc => {
    //       return (
    //         doc.data().reservation_date_id === currentReservationDateId &&
    //         doc.data().reservation_time_id === currentReservationTimeId
    //       );
    //     })
    //     .map(doc => {
    //       return {
    //         seat_no: doc.data().seat_no,
    //         reservation_id: doc.data().reservation_id,
    //         reserver_name: "",
    //         number_of_reservation: 0,
    //         mail: "",
    //         tel: "",
    //         comment: ""
    //       } as ReservationListSeat;
    //     })
    //     .orderBy(["seat_no"], ["asc"])
    //     .value();

    //   reservationList.push(item);
    //   currentReservationDateId = data.reservation_date_id;
    //   currentReservationTimeId = data.reservation_time_id;
    // });

    // 座席ごとの予約データセット
    // _.each(reservationList, (item: ReservationList) => {
    //   _.each(item.seats, (seat: ReservationListSeat) => {
    //     const myReservation = _.find(reservationsRef.docs, doc => doc.id === seat.reservation_id);

    //     if (!_.isNil(myReservation)) {
    //       seat.reserver_name = myReservation.data().reserver_name;
    //       seat.number_of_reservation = myReservation.data().number_of_reservation;
    //       seat.mail = myReservation.data().mail;
    //       seat.tel = myReservation.data().tel;
    //       seat.comment = myReservation.data().comment;
    //     }
    //   });
    // });
    console.log(items);

    commit(SET_ITEMS, items);

    return Promise.all([reservationsRef, reservationSeatsRef]);
  }
};

export default actions;
