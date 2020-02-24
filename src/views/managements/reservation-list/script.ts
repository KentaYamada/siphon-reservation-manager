import isMobile from "ismobilejs";
import Vue from "vue";
import { createNamespacedHelpers } from "vuex";
import reservation from "@/store/reservation";
import { FETCH, HAS_ITEMS } from "@/store/constant";
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
    return {
      isMobilePhone: isMobile().phone
    };
  },
  beforeCreate() {
    const { mapState, mapGetters, mapActions } = createNamespacedHelpers(
      "reservation"
    );
    this.$store.registerModule("reservation", reservation);
    this.$options.computed = {
      ...mapState(["reservations"]),
      ...mapGetters([HAS_ITEMS])
    };
    this.$options.methods = {
      ...mapActions([FETCH])
    };
  },
  mounted() {
    this.fetch();
  }
});
