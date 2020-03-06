import Vue from "vue";
import { mapActions, mapMutations, mapState } from "vuex";
import { INITIALIZE, SAVE } from "@/store/constant";
import ReservationForm from "@/components/reservations/form/ReservationForm.vue";

export default Vue.extend({
  components: {
    ReservationForm
  },
  computed: {
    ...mapState("reservation", ["reservation"])
  },
  methods: {
    ...mapMutations("reservation", [INITIALIZE]),
    ...mapActions("reservation", [SAVE]),

    onClickSave(): void {
      this.save(this.reservation);
    }
  },
  mounted() {
    this.initialize();
  }
});
