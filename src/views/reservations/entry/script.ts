import Vue from "vue";
import { mapActions, mapMutations, mapState } from "vuex";
import { required, email } from "vuelidate/lib/validators";
import { INITIALIZE, SAVE } from "@/store/constant";
import ReservationForm from "@/components/reservations/form/ReservationForm.vue";

export default Vue.extend({
  components: {
    ReservationForm
  },
  validations: {
    reservation: {
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
    ...mapMutations("reservation", [INITIALIZE]),
    ...mapActions("reservation", [SAVE]),

    onClickSave(): void {
      console.log(this.$v);
      this.$v.$touch();
      this.save(this.reservation);
    }
  },
  mounted() {
    this.initialize();
  }
});
