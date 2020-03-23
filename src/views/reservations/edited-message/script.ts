import Vue from "vue";

export default Vue.extend({
  props: {
    id: {
      required: true,
      type: String
    }
  }
});
