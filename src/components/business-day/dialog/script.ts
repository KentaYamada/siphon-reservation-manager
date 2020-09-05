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
    }),

    availableSyncSelectableTimezones(): boolean {
      if (_.isNil(this.businessDay) || _.isNil(this.businessDay.timezones)) {
        return false;
      }

      return this.businessDay.timezones.length > 0;
    }
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

    handleSyncSelectableTimezones(): void {
      this.isLoading = true;
      this.fetchSelectableTimezones()
        .then(() => {
          this.businessDay.timezones = _.clone(this.model.timezones);
        })
        .catch(() => {
          this.$emit("sync-selectable-timezones-failed");
        })
        .finally(() => {
          this.isLoading = false;
        });
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
      businessDay: {} as BusinessDay,
      isLoading: false,
      isSaving: false,
      minDate: new Date()
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
