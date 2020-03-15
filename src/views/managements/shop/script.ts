import Vue from "vue";
import { mapActions, mapState } from "vuex";

// component
import BusinessDayList from "@/components/business-day/list/BusinessDayList.vue";

// entity
import { BusinessDay } from "@/entity/business-day";
import { Timezone } from "@/entity/timezone";

// store
import { FETCH } from "@/store/constant";
import { ShopState } from "@/store/shop";

export default Vue.extend({
  components: {
    BusinessDayList
  },
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
