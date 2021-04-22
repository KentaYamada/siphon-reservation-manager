import Vue, { PropType } from "vue";
import { MailTransmissionLogSearchOption } from "@/entity/mail-transmission-log-search-option";

/**
 * Mail transmission log search form component
 */
export default Vue.extend({
  name: "mail-transmission-log-search-form",
  props: {
    searchOption: {
      required: true,
      type: Object as PropType<MailTransmissionLogSearchOption>
    }
  },
  methods: {
    handleClear(): void {
      this.$emit("clear-search-option");
    },
    handleSearch(): void {
      this.$emit("search");
    },
    handleUpdateReserverName(value: string): void {
      this.$emit("update-reserver-name", value);
    },
    handleUpdateSendDate(value: Date): void {
      this.$emit("update-send-date", value);
    }
  },
  template: "<mail-transmission-log-search-form/>"
});
