import Vue from "vue";

export default Vue.extend({
  template: "<no-list-item/>",
  props: {
    visibility: {
      type: Boolean,
      required: true
    }
  }
});
