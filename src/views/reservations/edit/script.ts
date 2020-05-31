import Vue from "vue";
import { mapActions, mapState } from "vuex";
import { ToastConfig } from "buefy/types/components";

// component
import ReservationForm from "@/components/reservations/form/ReservationForm.vue";

// entity
import { EMAIL_MESSAGE_TEMPLATES } from "@/entity/email";

// plugin
import { tel } from "@/plugins/validate";
import { required, email } from "vuelidate/lib/validators";

// store
import { FETCH_BY_ID, SAVE } from "@/store/constant";

// utility
import { sendEmail } from "@/utility/email-utility";

export default Vue.extend({
  components: {
    ReservationForm
  },
  props: {
    id: {
      required: true,
      type: String
    }
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
    ...mapActions("reservation", [FETCH_BY_ID, SAVE]),

    /**
     *  予約変更イベント
     */
    onClickSave(): void {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.isSaving = true;
        this.save(this.reservation)
          .then(() => {
            this.__sendEmail(this.id);

            const toastConfig: ToastConfig = {
              message: "予約変更しました。",
              type: "is-success"
            };

            this.$buefy.toast.open(toastConfig);
            this.$router.push({
              name: "reservation-edited-message",
              params: { id: this.id }
            });
          })
          .catch(error => {
            // todo: error handling
            console.error(error);
          })
          .finally(() => {
            this.isSaving = false;
          });
      }
    },

    /**
     * 予約完了通知メール送信
     * @param id
     */
    __sendEmail(id: string): void {
      const href = this.$router.resolve({
        name: "reservation-detail",
        params: {
          id: id
        }
      }).href;
      const redirectUrl = `${location.origin}${href}`;
      sendEmail(
        this.reservation,
        id,
        redirectUrl,
        EMAIL_MESSAGE_TEMPLATES.EDITED
      );
    }
  },
  data() {
    return {
      isSaving: false
    };
  },
  mounted() {
    this.fetchById(this.id);
  }
});
