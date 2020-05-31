import Vue from "vue";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";

// store
import { FETCH, HAS_ITEMS, SET_ITEMS } from "@/store/constant";

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
    ...mapMutations("reservation", [SET_ITEMS]),

    /**
     * 検索パラメータ更新イベント
     */
    updateSearchOptions(options: ReservationSearchOption): void {
      this.$data.options = options;

      if (options.reservation_date_id !== "") {
        this.fetch(options);
      }
    }
  },
  data() {
    const options: ReservationSearchOption = {
      reservation_date_id: "",
      reservation_time_id: ""
    };

    return {
      options: options
    };
  },
  mounted() {
    this.setItems([]);
  }
});
