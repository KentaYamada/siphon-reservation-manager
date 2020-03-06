import Vue, { PropType } from "vue";
import { mapActions, mapState } from "vuex";
import { FETCH } from "@/store/constant";
import { Reservation } from "@/entity/reservation";

export default Vue.extend({
  template: "<reservation-form/>",
  props: {
    reservation: {
      required: true,
      type: Object as PropType<Reservation>
    }
  },
  computed: {
    ...mapState("timezone", ["timezones"])
  },
  methods: {
    ...mapActions("timezone", [FETCH])
  },
  mounted() {
    this.fetch();
  }
});
