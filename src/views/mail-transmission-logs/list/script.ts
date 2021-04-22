import Vue from "vue";
import { mapMutations, mapState } from "vuex";
import MailTransmissionLogList from "@/components/mail-transmission-logs/list/MailTransmissionLogList.vue";
import MailTransmissionLogSearchForm from "@/components/mail-transmission-logs/search-form/MailTransmissionLogSearchForm.vue";
import { MailTransmissionLog } from "@/entity/mail-transmission-log";
import { INITIALIZE, UPDATE_RESERVER_NAME, UPDATE_SEND_DATE } from "@/store/constant";

/**
 * Mail transmission log list view
 */
export default Vue.extend({
  name: "mail-transmission-log-list-view",
  components: {
    MailTransmissionLogList,
    MailTransmissionLogSearchForm
  },
  data() {
    return {
      isLoading: false,
      mailTransmissionLogs: [
        {
          id: "1",
          mail: "test@email.com",
          redirect_url: "",
          reserver_name: "Test 太郎",
          send_datetime: new Date(),
          type: "reservation_create",
          // type: "cancel_reservation",
          type_name: "予約作成"
        },
        {
          id: "2",
          mail: "test@email.com",
          redirect_url: "",
          reserver_name: "Test 太郎",
          send_datetime: new Date(),
          type: "reservation_create",
          // type: "cancel_reservation",
          type_name: "予約作成"
        }
      ] as Array<MailTransmissionLog>
    };
  },
  computed: {
    ...mapState("mailTransmissionLog", [
      // "mailTransmissionLogs",
      "searchOption"
    ])
  },
  created() {
    this.initialize();
  },
  methods: {
    ...mapMutations("mailTransmissionLog", {
      initialize: INITIALIZE,
      updateReserverName: UPDATE_RESERVER_NAME,
      updateSendDate: UPDATE_SEND_DATE
    }),

    handleClearSearchOption(): void {
      this.initialize();
    },

    handleSearch(): void {
      console.log("search");
    },

    handleUpdateReserveName(value: string): void {
      this.updateReserverName(value);
    },

    handleUpdateSendDate(value: Date): void {
      this.updateSendDate(value);
    }
  }
});
