import Vue from "vue";
import { mapMutations, mapState } from "vuex";
import { INITIALIZE } from "@/store/constant";
import ReservationForm from "@/components/reservations/form/ReservationForm.vue";

export default Vue.extend({
  components: {
    ReservationForm
  },
  computed: {
    ...mapState("reservation", ["reservation"])
  },
  methods: {
    ...mapMutations("reservation", [INITIALIZE])
  },
  mounted() {
    this.initialize();
  }
});
