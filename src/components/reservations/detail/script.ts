import Vue, { PropType } from "vue";
import { mapActions, mapState } from "vuex";
import ReservationSeatList from "@/components/reservation-seats/list/ReservationSeatList.vue";
import { nl2br } from "@/filters/nl2br";
import { formatReservationDatetime } from "@/filters/format-reservation-datetime";
import { reserverNameWithNumberOfPeople } from "@/filters/reserver-name-with-number-of-people";
import { FETCH_BY_ID } from "@/store/constant";

export default Vue.extend({
  template: "<reservation-detail-content/>",
  components: {
    ReservationSeatList
  },
  props: {
    id: {
      required: true,
      type: String
    }
  },
  computed: {
    ...mapState("reservation", ["reservation"]),

    reservationComment(): string {
      return nl2br(this.reservation.comment);
    }
  },
  methods: {
    ...mapActions("reservation", {
      fetchById: FETCH_BY_ID
    })
  },
  filters: {
    formatReservationDatetime,
    reserverNameWithNumberOfPeople
  },
  mounted() {
    this.$emit("load-start");
    this.fetchById(this.id)
      .then(() => {
        this.$emit("load-succeeded");
      })
      .catch(() => {
        this.$emit("load-failure");
      });
  }
});
