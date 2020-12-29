import Vue from "vue";

export default Vue.extend({
  template: "<reservation-cancel-log-search-form/>",
  methods: {
    handleSearch(): void {
      this.$emit("search");
    }
  }
});
