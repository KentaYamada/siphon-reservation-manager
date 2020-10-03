import Vue, { PropType } from "vue";
import { mapGetters } from "vuex";
import { ReservationList } from "@/entity/reservation-list";
import ReservationListItem from "@/components/reservations/list-item/ReservationListItem.vue";
import { HAS_ITEMS } from "@/store/constant";

export default Vue.extend({
  template: "<reservation-list/>",
  components: {
    ReservationListItem
  },
  props: {
    reservationList: {
      required: true,
      type: Array as PropType<Array<ReservationList>>
    }
  },
  computed: {
    ...mapGetters("reservationList", {
      hasItems: HAS_ITEMS
    })
  },
  methods: {
    handleCancelSucceeded() {
      this.$emit("cancel-succeeded");
    },

    handleCancelFailed() {
      this.$emit("cancel-failed");
    }
  }
});
