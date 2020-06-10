import Vue from "vue";
import { mapGetters } from "vuex";

// component
import Navigation from "@/components/navigation/Navigation.vue";

// store
import { IS_SIGNED_IN } from "@/store/constant";

export default Vue.extend({
  components: {
    Navigation
  },
  computed: {
    ...mapGetters("auth", [IS_SIGNED_IN])
  }
});
