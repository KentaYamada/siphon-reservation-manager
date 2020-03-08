import Vue from "vue";
import { mapActions, mapState } from "vuex";
import { FETCH_BY_ID, SAVE } from "@/store/constant";
import ReservationForm from "@/components/reservations/form/ReservationForm.vue";

export default Vue.extend({
  components: {
    ReservationForm
  },
  props: {
    id: {
      required: true,
      type: Number
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
      this.save(this.reservation);
    }
  },
  data() {
    const errors = {
      // reservation_date: ["予約日時は必須です。", "hoge"],
      // reservation_timezone: ["時間帯を選択してください。", "hoge"],
      // reservation_seats: ["座席を指定してください。"],
      // number_of_reservations: ["予約人数は1名から入力してください。"],
      // name: ["お名前は必須入力です。"],
      // tel: ["電話番号は必須入力です。"],
      // mail: ["メールアドレスは必須入力です。"]
    };

    return { errors };
  },
  mounted() {
    this.fetchById(this.id);
  }
});
