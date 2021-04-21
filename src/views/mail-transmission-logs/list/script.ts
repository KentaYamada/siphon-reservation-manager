import Vue from "vue";
import MailTransmissionLogList from "@/components/mail-transmission-logs/list/MailTransmissionLogList.vue";
import { MailTransmissionLog } from "@/entity/mail-transmission-log";

/**
 * Mail transmission log list view
 */
export default Vue.extend({
  name: "mail-transmission-log-list-view",
  components: {
    MailTransmissionLogList
  },
  data() {
    return {
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
        }
      ] as Array<MailTransmissionLog>
    };
  }
});
