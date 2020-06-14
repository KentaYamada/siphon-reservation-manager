import Vue from "vue";
import { mapActions, mapGetters, mapState } from "vuex";
import { ToastConfig } from "buefy/types/components";

// component
import ReservationForm from "@/components/reservations/form/ReservationForm.vue";

// entity
import { EMAIL_MESSAGE_TEMPLATES } from "@/entity/email";

// plugin
import { tel } from "@/plugins/validate";
import { required, email } from "vuelidate/lib/validators";

// store
import { FETCH_BY_ID, SAVE, HAS_SELECTED_SEATS } from "@/store/constant";

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
    ...mapState("reservation", ["reservation"]),
    ...mapGetters("reservation", [HAS_SELECTED_SEATS]),

    disableEdit(): boolean {
      return this.isSaving || !this.isLoaded;
    }
  },
  methods: {
    ...mapActions("reservation", [FETCH_BY_ID, SAVE]),

    /**
     *  予約変更イベント
     */
    onClickSave(): void {
      const toastConfig: ToastConfig = {
        message: "",
        type: ""
      };

      this.isSaving = true;
      this.$v.$touch();

      if (!this.$v.$invalid && this.hasSelectedSeats) {
        this.save(this.reservation)
          .then(() => {
            toastConfig.message = "予約変更しました。";
            toastConfig.type = "is-success";

            this.__sendEmail(this.id);
            this.$buefy.toast.open(toastConfig);
            this.$router.push({ name: "reservation-edited-message", params: { id: this.id } });
          })
          .catch(() => {
            toastConfig.message = "予約の失敗に失敗しました。";
            toastConfig.type = "is-danger";

            this.$buefy.toast.open(toastConfig);
          })
          .finally(() => {
            this.isSaving = false;
          });
      } else {
        toastConfig.message = "入力内容に誤りがあります。エラーメッセージを確認してください。";
        toastConfig.type = "is-danger";

        this.isSaving = false;
        this.$buefy.toast.open(toastConfig);
      }
    },

    /**
     * データ読込完了通知イベント
     */
    onDataLoaded(): void {
      this.isLoading = false;
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
      sendEmail(this.reservation, id, redirectUrl, EMAIL_MESSAGE_TEMPLATES.EDITED);
    }
  },
  data() {
    return {
      isSaving: false,
      isLoaded: false,
      isLoading: true
    };
  },
  mounted() {
    this.fetchById(this.id)
      .then(() => {
        this.isLoaded = true;
      })
      .catch(() => {
        const toastConfig: ToastConfig = {
          message: "予約データの取得に失敗しました。",
          type: "is-danger"
        };

        this.$buefy.toast.open(toastConfig);
        this.$router.push({ name: "notfound" });
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
});
