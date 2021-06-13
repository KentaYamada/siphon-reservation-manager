import Vue from "vue";
import UpdateListItem from "@/components/updates/list-item/UpdateListItem.vue";

/**
 * Update information list component
 */
export default Vue.extend({
  name: "update-list",
  components: {
    UpdateListItem
  },
  template: "<update-list/>"
});
