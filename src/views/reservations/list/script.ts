import isMobile from "ismobilejs";
import Vue from "vue";
import { mapActions, mapGetters, mapState } from "vuex";
import { FETCH, HAS_ITEMS } from "@/store/constant";
import { ReservationSearchOption } from "@/entity/reservation-search-option";
import ReservationListForPc from "@/components/reservations/list/list-for-pc/ReservationListForPc.vue";
import ReservationListForMobile from "@/components/reservations/list/list-for-mobile/ReservationListForMobile.vue";
import ReservationSearchForm from "@/components/reservations/search/ReservationSearchForm.vue";

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
      this.$data.options = options;
      this.fetch(options);
    }
  },
  data() {
    const options: ReservationSearchOption = {
      reservation_date: new Date(),
      timezone_id: null
    };

    return {
      options: options,
      isMobilePhone: isMobile().phone
    };
  },
  mounted() {
    this.fetch(this.options);
  }
});
