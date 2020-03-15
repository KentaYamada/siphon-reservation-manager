import Vue from "vue";
import { mapActions, mapState } from "vuex";
import { BusinessDay } from "@/entity/business-day";
import { Timezone } from "@/entity/timezone";
import { FETCH } from "@/store/constant";
import { ShopState } from "@/store/shop";

export default Vue.extend({
  computed: {
    ...mapState("shop", ["businessDays", "timezones"])
  },
  methods: {
    ...mapActions("shop", [FETCH])
  },
  mounted() {
    this.fetch();
  }
});
