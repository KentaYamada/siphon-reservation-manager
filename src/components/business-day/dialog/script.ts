import Vue from "vue";
import { mapActions, mapMutations, mapState } from "vuex";
import { required } from "vuelidate/lib/validators";
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

    handleClickSave(): void {
      this.$v.$touch();

      if (this.$v.$invalid) {
        this.$emit("validation-failed");
      } else {
        this.isSaving = true;
        this.save(this.businessDay)
          .then(() => {
            this.$emit("save-succeeded");
            this.$emit("close");
          })
          .catch(() => {
            this.$emit("save-failed");
          })
          .finally(() => {
            this.isSaving = false;
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
        this.$emit("load-business-day-failed");
        this.$emit("close");
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
});
