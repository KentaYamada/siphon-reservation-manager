import Vue from "vue";
import { email, minValue, required } from "vuelidate/lib/validators";
import { isEmpty } from "lodash";
import { tap } from "rxjs/operators";
import { tel } from "@/plugins/validate";
import { NewYearDishesReservation } from "@/entity/new-year-dishes-reservation";
import { NewYearDishesReservationService } from "@/services/firestore/new-year-dishes-reservation-service";

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
            this.$emit("update-progress", true);
          }
        );
      }
    }
  },
  data() {
    return {
      reservation: {
        quantity: 0,
        reserver_name: "",
        address: "",
        tel: "",
        mail: "",
        comment: "",
        is_delivered: false
      } as NewYearDishesReservation
    };
  },
  mounted() {
    if (!isEmpty(this.id)) {
      this.$emit("update-progress", true);

      NewYearDishesReservationService.fetchById(this.id)
        .pipe(tap(() => this.$emit("update-progress", false)))
        .subscribe(
          (reservation: NewYearDishesReservation) => {
            this.reservation = reservation;
          },
          () => {
            this.$emit("initialize-failed");
          }
        );
    }
  }
});
