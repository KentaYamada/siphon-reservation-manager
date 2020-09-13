import Vue, { PropType } from "vue";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import _ from "lodash";
import ReservationListItem from "@/components/reservations/list-item/ReservationListItem.vue";
import { ReservationSearchOption } from "@/entity/reservation-search-option";
import { FETCH, HAS_ITEMS, SET_ITEMS } from "@/store/constant";

export default Vue.extend({
  template: "<reservation-list/>",
  components: {
    ReservationListItem
  },
  props: {
    searchOption: {
      required: true,
      type: Object as PropType<ReservationSearchOption>
    },
    isLoading: {
      required: true,
      type: Boolean
    }
  },
  computed: {
    ...mapState("reservationList", ["reservationList"]),
    ...mapGetters("reservationList", {
      hasItems: HAS_ITEMS
    })
    // ...mapState("reservation", ["reservations"]),
    // ...mapGetters("reservation", {
    //   hasItems: HAS_ITEMS
    // })
  },
  methods: {
    ...mapActions("reservationList", {
      fetch: FETCH
    }),
    ...mapMutations("reservationList", {
      setItems: SET_ITEMS
    }),
    // ...mapActions("reservation", {
    //   fetch: FETCH
    // }),
    // ...mapMutations("reservation", {
    //   setItems: SET_ITEMS
    // }),

    handleDeleteSucceeded() {
      this._fetch();
    },

    _fetch() {
      if (!_.isEmpty(this.searchOption.reservation_date_id)) {
        this.fetch(this.searchOption)
          .then(() => {
            this.$emit("load-succeeded");
          })
          .catch(error => {
            console.error(error);
            this.$emit("load-failure");
          });
      }
    }
  },
  watch: {
    // todo: watchをトリガーにするのか見直し
    isLoading: function (newVal: boolean, oldVal: boolean): void {
      if (newVal) {
        this._fetch();
      }
    }
  },
  mounted() {
    this.setItems([]);
    this._fetch();
  }
});
