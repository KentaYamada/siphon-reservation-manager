import Vue from "vue";
import isMobile from "ismobilejs";
import ReservationListForPc from "@/components/reservations/reservation-list-for-pc/ReservationListForPc.vue";
import ReservationListForMobile from "@/components/reservations/reservation-list-for-mobile/ReservationListForMobile.vue";
import ReservationSearchForm from "@/components/reservations/reservation-search-form/ReservationSearchForm.vue";

export default Vue.extend({
  components: {
    ReservationSearchForm,
    ReservationListForPc,
    ReservationListForMobile
  },
  data() {
    const reservations = [
      {
        id: 1,
        reservation_date: "2020-02-01 11:00 - 12:00",
        reservation_name: "Test太郎",
        number_of_reservations: 3,
        tel: "080-1479-7082",
        mail: "test@email.com"
      },
      {
        id: 2,
        reservation_date: "2020-02-01 11:00 - 12:00",
        reservation_name: "Test太郎",
        number_of_reservations: 3,
        tel: "080-1479-7082",
        mail: "test@email.com"
      },
      {
        id: 3,
        reservation_date: "2020-02-01 11:00 - 12:00",
        reservation_name: "Test太郎",
        number_of_reservations: 3,
        tel: "080-1479-7082",
        mail: "test@email.com"
      },
      {
        id: 4,
        reservation_date: "2020-02-01 11:00 - 12:00",
        reservation_name: "Test太郎",
        number_of_reservations: 3,
        tel: "080-1479-7082",
        mail: "test@email.com"
      },
      {
        id: 5,
        reservation_date: "2020-02-01 11:00 - 12:00",
        reservation_name: "Test太郎",
        number_of_reservations: 3,
        tel: "080-1479-7082",
        mail: "test@email.com"
      }
    ];
    return {
      reservations,
      isMobilePhone: isMobile().phone
    };
  }
});
