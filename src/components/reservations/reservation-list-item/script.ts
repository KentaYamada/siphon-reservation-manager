import Vue from "vue";

export default Vue.extend({
  template: "<reservation-list-item/>",
  props: {
    reservation: {
      required: true
    }
  }
});
