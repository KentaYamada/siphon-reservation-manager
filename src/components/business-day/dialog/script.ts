import Vue, { PropType } from "vue";
import { mapActions, mapMutations, mapState } from "vuex";
import { required } from "vuelidate/lib/validators";
import { BNoticeConfig } from "buefy/types/components";
import _ from "lodash";
import SelectableTimezoneList from "@/components/timezones/selectable-list/SelectableTimezoneList.vue";
import { BusinessDay } from "@/entity/business-day";
import { SelectableTimezone } from "@/entity/selectable-timezone";
import { FETCH_BY_ID, FETCH_SELECTABLE_TIMEZONES, INITIALIZE, SAVE } from "@/store/constant";

export default Vue.extend({
  components: {
    SelectableTimezoneList
  },
  props: {
    id: {
      required: false,
      type: String
    }
  },
  validations: {
    businessDay: {
      business_date: {
        required
      }
    }
  },
  computed: {
    ...mapState("businessDay", {
      model: "businessDay"
    })
  },
  methods: {
    ...mapActions("businessDay", [FETCH_BY_ID, FETCH_SELECTABLE_TIMEZONES, SAVE]),
    ...mapMutations("businessDay", [INITIALIZE]),

    /**
     * 営業日保存
     */
    handleClickSave(): void {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.isSaving = true;
        this.save(this.businessDay)
          .then(() => {
            this.$emit("save-success");
          })
          .catch((error) => {
            this.$emit("save-failure", error);
          })
          .finally(() => {
            this.isSaving = false;
            this.$emit("close");
          });
      }
    },

    handleAllCheckTimezones(): void {
      _.each(this.businessDay.timezones, (timezone: SelectableTimezone) => {
        timezone.selected = true;
      });
    },

    handleAllUnCheckTimezones(): void {
      _.each(this.businessDay.timezones, (timezone: SelectableTimezone) => {
        timezone.selected = false;
      });
    }
  },
  data() {
    return {
      isLoading: false,
      isSaving: false,
      businessDay: {} as BusinessDay
    };
  },
  mounted() {
    this.isLoading = true;
    this.initialize();

    let promise = null;

    if (_.isNil(this.id)) {
      promise = this.fetchSelectableTimezones();
    } else {
      promise = this.fetchById(this.id);
    }

    promise
      .then(() => {
        this.businessDay = _.clone(this.model);
      })
      .catch(() => {
        const toastConfig: BNoticeConfig = {
          message: "データの取得に失敗しました",
          type: "is-danger"
        };
        this.$buefy.toast.open(toastConfig);
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
});
