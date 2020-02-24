import isMobile from "ismobilejs";
import Vue from "vue";
import { mapActions, mapGetters, mapState } from "vuex";
import { FETCH, HAS_ITEMS } from "@/store/constant";
import { ReservationSearchOption } from "@/entity/reservation-search-option";
import ReservationListForPc from "@/components/reservations/reservation-list-for-pc/ReservationListForPc.vue";
import ReservationListForMobile from "@/components/reservations/reservation-list-for-mobile/ReservationListForMobile.vue";
import ReservationSearchForm from "@/components/reservations/reservation-search-form/ReservationSearchForm.vue";

export default Vue.extend({
  components: {
    ReservationSearchForm,
    ReservationListForPc,
    ReservationListForMobile
  },
  computed: {
    ...mapState("reservation", ["reservations"]),
    ...mapGetters("reservation", [HAS_ITEMS])
  },
  methods: {
    ...mapActions("reservation", [FETCH]),

    /**
     * 検索パラメータ更新イベント
     */
    updateSearchOptions(options: ReservationSearchOption): void {
      console.log(options);
    }
  },
  data() {
    return {
      isMobilePhone: isMobile().phone
    };
  },
  mounted() {
    this.fetch();
  }
});
