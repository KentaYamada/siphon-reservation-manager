import Vue, { PropType } from "vue";

/**
 * Mail transmission log search form component
 */
export default Vue.extend({
  name: "mail-transmission-log-search-form",
  methods: {
    handleClear(): void {
      this.$emit("clear-search-option");
    },
    handleSearch(): void {
      this.$emit("search");
    },
    handleUpdateReserveName(value: string): void {
      this.$emit("update-reserver-name", value);
    },
    handleUpdateSendDate(value: Date): void {
      this.$emit("update-send-date", value);
    }
  },
  template: "<mail-transmission-log-search-form/>"
});
