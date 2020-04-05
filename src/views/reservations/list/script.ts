import Vue from "vue";
import { mapActions, mapGetters, mapState } from "vuex";

// store
import { FETCH, HAS_ITEMS } from "@/store/constant";

// entity
import { ReservationSearchOption } from "@/entity/reservation-search-option";

// component
import ReservationList from "@/components/reservations/list/ReservationList.vue";
import ReservationSearchForm from "@/components/reservations/search/ReservationSearchForm.vue";

export default Vue.extend({
  components: {
    ReservationList,
    ReservationSearchForm
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
      options: options
    };
  },
  mounted() {
    this.fetch(this.options);
  }
});
