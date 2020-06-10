import Vue from "vue";

// component
import Navigation from "@/components/navigation/Navigation.vue";

export default Vue.extend({
  components: {
    Navigation
  },
  computed: {
    visibleLoginBg(): boolean {
      return this.$route.name === "login";
    }
  }
});
