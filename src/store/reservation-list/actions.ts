import { ActionTree } from "vuex";
import _ from "lodash";
import moment from "moment";
import { ReservationList } from "@/entity/reservation-list";
import { Reserver } from "@/entity/reserver";
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
    const reservationRef = await reservationService.fetch(option);
    const reservationSeatRef = await reservationSeatService.fetch(option);

    const seats = _.chain(reservationSeatRef.docs)
      .filter(doc => doc.data().is_reserved)
      .map(doc => {
        return {
          seat_no: doc.data().seat_no,
          seat_nos: [],
          reservation_id: doc.data().reservation_id,
          reserver_name: "",
          reservation_date: doc.data()?.reservation_date.toDate(),
          reservation_date_id: doc.data().reservation_date_id,
          reservation_start_time: doc.data()?.reservation_start_time.toDate(),
          reservation_end_time: doc.data()?.reservation_end_time.toDate(),
          reservation_time_id: doc.data().reservation_time_id,
          number_of_reservations: 0,
          mail: "",
          tel: "",
          comment: ""
        } as Reserver;
      })
      .each(doc => {
        const reservation = _.find(reservationRef.docs, d => d.id === doc.reservation_id);
        if (reservation) {
          doc.reserver_name = reservation.data().reserver_name;
          doc.number_of_reservations = reservation.data().number_of_reservations;
          doc.mail = reservation.data().mail;
          doc.tel = reservation.data().tel;
          doc.comment = reservation.data().comment;
        }
      })
      .groupBy(seat => seat.reservation_id)
      .map(seat => {
        const seatNo = _.map(seat, "seat_no").sort();
        const mergedItem = _.merge({}, ...seat);
        mergedItem.seat_nos = seatNo;
        return mergedItem;
      })
      .orderBy(["seat_no"], ["asc"])
      .value();

    const reservations = _.chain(reservationRef.docs)
      .groupBy(doc => doc.data()?.reservation_start_time.toDate())
      .map(doc => {
        const startTime = moment(doc[0].data()?.reservation_start_time?.toDate()).set({
          year: 2020,
          month: 0,
          date: 1
        });
        const endTime = moment(doc[0].data()?.reservation_end_time?.toDate()).set({
          year: 2020,
          month: 0,
          date: 1
        });

        return {
          id: doc[0].id,
          reservation_date: doc[0].data()?.reservation_date.toDate(),
          reservation_date_id: doc[0].data().reservation_date_id,
          reservation_start_time: startTime.toDate(),
          reservation_end_time: endTime.toDate(),
          reservation_time_id: doc[0].data().reservation_time_id,
          seats: []
        } as ReservationList;
      })
      .each(doc => {
        doc.seats = _.filter(seats, (seat: Reserver) => {
          return (
            doc.reservation_date_id === seat.reservation_date_id && doc.reservation_time_id === seat.reservation_time_id
          );
        });
      })
      .orderBy(["reservation_start_time", "reservation_end_time"], ["asc", "asc"])
      .value();

    commit(SET_ITEMS, reservations);

    return Promise.all([reservationRef, reservationSeatRef]);
  }
};

export default actions;
