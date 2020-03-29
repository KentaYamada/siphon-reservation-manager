import Vue from "vue";
import { mapMutations, mapState } from "vuex";
import { required, email } from "vuelidate/lib/validators";

// components
import ReservationAllReservedForm from "@/components/reservations/form/all-reserved/ReservationAllReservedForm.vue";

// store
import { INITIALIZE_ALL_RESERVED } from "@/store/constant";

export default Vue.extend({
  components: {
    ReservationAllReservedForm
  },
  validations: {
    reservation: {
      reservation_date: {
        required
      },
      reservation_time: {
        required
      },
      reserver_name: {
        required
      },
      tel: {
        required
      },
      mail: {
        required,
        email
      }
    }
  },
  computed: {
    ...mapState("reservation", ["reservation"])
  },
  methods: {
    ...mapMutations("reservation", [INITIALIZE_ALL_RESERVED]),

    onClickSave(): void {
      console.log(this.reservation);
    }
  },
  data() {
    return {
      isSaving: false
    };
  },
  mounted() {
    this.initializeAllReserved();
  }
});
