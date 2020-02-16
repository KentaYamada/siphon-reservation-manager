import Vue from "vue";

export default Vue.extend({
  template: "<reservation-list-item/>",
  props: {
    reservation: {
      required: true
    }
  },
  computed: {
    numberOfReservations(): string {
      return `${this.reservation.number_of_reservations}名`;
    }
  }
});
