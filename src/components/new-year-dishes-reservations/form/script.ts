import Vue from "vue";
import { email, minValue, required } from "vuelidate/lib/validators";
import { tel } from "@/plugins/validate";
import { NewYearDishesReservation } from "@/entity/new-year-dishes-reservation";
import { NewYearDishesReservationService } from "@/services/firestore/new-year-dishes-reservation-service";

export default Vue.extend({
  template: "<new-year-dishes-reservation-form/>",
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

        NewYearDishesReservationService.save(this.reservation).subscribe(
          () => {
            this.$emit("save-succeeded");
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
      reservation: {} as NewYearDishesReservation
    };
  }
});
