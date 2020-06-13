import Vue from "vue";
import { mapActions, mapMutations, mapState } from "vuex";
import { ToastConfig } from "buefy/types/components";
import { required, email } from "vuelidate/lib/validators";

// component
import ReservationAllReservedForm from "@/components/reservations/form/all-reserved/ReservationAllReservedForm.vue";

// plugin
import { tel } from "@/plugins/validate";

// store
import { INITIALIZE, SAVE } from "@/store/constant";

export default Vue.extend({
  components: {
    ReservationAllReservedForm
  },
  methods: {
    onDataLoaded(): void {
      this.isLoading = true;
    }
  },
  data() {
    return {
      isLoading: false
    };
  }
});
