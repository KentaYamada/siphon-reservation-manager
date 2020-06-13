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
  validations: {
    reservation: {
      reservation_date: {
        required
      },
      reservation_start_time: {
        required
      },
      reserver_name: {
        required
      },
      number_of_reservations: {
        required
      },
      tel: {
        required,
        tel
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
    ...mapActions("reservation", [SAVE]),
    ...mapMutations("reservation", [INITIALIZE]),

    onClickSave(): void {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        // something
      } else {
        const toastConfig: ToastConfig = {
          message: "入力内容に誤りがあります。エラーメッセージを確認してください。",
          type: "is-danger"
        };
        this.$buefy.toast.open(toastConfig);
      }
    },

    onDataLoaded(): void {
      this.isLoading = false;
    }
  },
  data() {
    return {
      isLoading: true
    };
  },
  mounted() {
    this.initialize();
  }
});
