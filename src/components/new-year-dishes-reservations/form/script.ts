import Vue from "vue";
import moment from "moment";
import { email, minValue, required } from "vuelidate/lib/validators";
import { isEmpty } from "lodash";
import { forkJoin } from "rxjs";
import { tap } from "rxjs/operators";
import { tel } from "@/plugins/validate";
import { NewYearDishesReservation } from "@/entity/new-year-dishes-reservation";
import { NewYearDishesSetting } from "@/entity/new-year-dishes-setting";
import { NewYearDishesReservationService } from "@/services/firestore/new-year-dishes-reservation-service";
import { NewYearDishesSettingService } from "@/services/firestore/new-year-dishes-setting-service";

export default Vue.extend({
  template: "<new-year-dishes-reservation-form/>",
  props: {
    id: {
      required: false,
      type: String,
      default: ""
    }
  },
  validations: {
    reservation: {
      quantity: {
        required,
        minValue: minValue(1)
      },
      reserver_name: {
        required
      },
      address: {
        required
      },
      tel: {
        required,
        tel
      },
      mail: {
        required,
        email
      }
    }
  },
  computed: {
    isAccessible(): boolean {
      if (this.setting.is_pause) {
        return false;
      }

      if (moment(this.setting.end_datetime).diff(new Date()) <= 0) {
        return false;
      }

      if (this.setting.receptions < this.receptions) {
        return false;
      }

      return true;
    },

    quantityList(): Array<number> {
      return [...Array(this.setting.max_quantity_per_reservation).keys()].map(i => ++i);
    },

    maxReceptionsHelpText(): string {
      return `※最大${this.setting.max_quantity_per_reservation}セットまで`;
    }
  },
  methods: {
    handleSave() {
      this.$v.$touch();

      if (this.$v.$invalid) {
        this.$emit("validation-failed");
      } else {
        this.$emit("update-progress", true);

        const observe$ = isEmpty(this.id)
          ? NewYearDishesReservationService.add(this.reservation)
          : NewYearDishesReservationService.edit(this.reservation);

        observe$.subscribe(
          (snapshot: firebase.firestore.DocumentSnapshot) => {
            this.$emit("save-succeeded", snapshot.id);
          },
          () => {
            this.$emit("save-failed");
          },
          () => {
            this.$emit("update-progress", false);
          }
        );
      }
    }
  },
  data() {
    const reservation = {
      quantity: 0,
      reserver_name: "",
      address: "",
      tel: "",
      mail: "",
      comment: "",
      is_delivered: false
    } as NewYearDishesReservation;
    const setting = {} as NewYearDishesSetting;

    return {
      reservation: reservation,
      setting: setting,
      receptions: 0
    };
  },
  created() {
    forkJoin([NewYearDishesSettingService.fetch(), NewYearDishesReservationService.fetchReceptions()]).subscribe(
      value => {
        this.setting = value[0];
        this.receptions = value[1];
      },
      () => {
        this.$emit("initialize-failed");
      },
      () => {
        if (!this.isAccessible) {
          this.$emit("access-denied");
        }
      }
    );
  },
  mounted() {
    if (!isEmpty(this.id)) {
      this.$emit("update-progress", true);

      NewYearDishesReservationService.fetchById(this.id)
        .pipe(tap(() => this.$emit("update-progress", false)))
        .subscribe(
          (reservation: NewYearDishesReservation) => (this.reservation = reservation),
          () => this.$emit("initialize-failed")
        );
    }
  }
});
