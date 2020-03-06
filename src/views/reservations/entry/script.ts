import Vue from "vue";
import ReservationSeats from "@/components/reservation-seats/list/ReservationSeatList.vue";

export default Vue.extend({
  components: {
    ReservationSeats
  },
  data() {
    const timeTables = [
      { id: 1, name: "11:00 - 12:00" },
      { id: 2, name: "12:30 - 13:30" },
      { id: 3, name: "14:00 - 15:00" },
      { id: 4, name: "15:30 - 16:30" },
      { id: 5, name: "17:00 - 18:00" }
    ];
    return {
      timeTables
    };
  }
});
