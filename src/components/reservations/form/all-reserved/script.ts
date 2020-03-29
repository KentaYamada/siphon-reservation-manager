import Vue, { PropType } from "vue";
import { mapActions, mapGetters, mapState } from "vuex";

// entity
import { Reservation } from "@/entity/reservation";

// store
import { FETCH } from "@/store/constant";

export default Vue.extend({
  template: "<reservation-all-reserved-form/>",
  props: {
    reservation: {
      required: true,
      type: Object as PropType<Reservation>
    },
    validations: {
      required: true,
      type: Object
    }
  },
  computed: {
    ...mapState("businessDay", ["businessDays"])
  },
  methods: {
    ...mapActions("businessDay", {
      fetchBusinessDays: FETCH
    })
  },
  mounted() {
    this.fetchBusinessDays();
  }
});
