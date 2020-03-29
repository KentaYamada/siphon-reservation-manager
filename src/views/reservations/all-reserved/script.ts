import Vue from "vue";

// components
import ReservationAllReservedForm from "@/components/reservations/form/all-reserved/ReservationAllReservedForm.vue";

export default Vue.extend({
  components: {
    ReservationAllReservedForm
  },
  methods: {
    onClickSave(): void {
      console.log("save");
    }
  },
  data() {
    return {
      isSaving: false
    };
  }
});
