import Vue, { PropType } from "vue";
import { mapActions, mapMutations, mapState } from "vuex";
import { required } from "vuelidate/lib/validators";
import _ from "lodash";
import { Timezone } from "@/entity/timezone";
import { FETCH_BY_ID, INITIALIZE, SAVE } from "@/store/constant";

export default Vue.extend({
  props: {
    id: {
      required: false,
      type: String
    }
  },
  validations: {
    timezone: {
      start_time: {
        required
      },
      end_time: {
        required
      }
    }
  },
  computed: {
    ...mapState("timezone", {
      model: "timezone"
    })
  },
  methods: {
    ...mapActions("timezone", [FETCH_BY_ID, SAVE]),
    ...mapMutations("timezone", [INITIALIZE]),

    handleClickSave(): void {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.isSaving = true;
        this.save(this.timezone)
          .then(() => {
            this.$emit("close");
            this.$emit("save-success");
          })
          .catch(() => {
            // todo: error handling
          })
          .finally(() => {
            this.isSaving = false;
          });
      }
    }
  },
  data() {
    return {
      isSaving: false,
      timezone: {} as Timezone
    };
  },
  mounted() {
    this.initialize();

    if (_.isNil(this.id)) {
      this.timezone = _.clone(this.model);
    } else {
      this.fetchById(this.id).then(() => {
        this.timezone = _.clone(this.model);
      });
    }
  }
});
