import Vue from "vue";
import moment from "moment";
import { mapGetters, mapMutations } from "vuex";
import { email, minValue, required } from "vuelidate/lib/validators";
import { isEmpty } from "lodash";
import { Observable, zip } from "rxjs";
import { tap } from "rxjs/operators";
import { tel } from "@/plugins/validate";
import { NewYearDishesReservation } from "@/entity/new-year-dishes-reservation";
import { NewYearDishesSetting } from "@/entity/new-year-dishes-setting";
import { NewYearDishesReservationService } from "@/services/firestore/new-year-dishes-reservation-service";
import { NewYearDishesSettingService } from "@/services/firestore/new-year-dishes-setting-service";
import { GET_QUANTITY_LIST, IS_ACCESSIBLE, SET_ITEM } from "@/store/constant";

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
    ...mapGetters("newYearDishesSetting", {
      quantityList: GET_QUANTITY_LIST
      // isAccessible: IS_ACCESSIBLE
    }),

    isAccessible(): boolean {
      if (this.setting.is_pause) {
        return false;
      }

      if (moment().diff(this.setting.end_datetime) <= 0) {
        return false;
      }

      // todo: 予約受付上限こえてるか
      if (this.setting.receptions < 45) {
        return false;
      }

      return true;
    }
  },
  methods: {
    ...mapMutations("newYearDishesSetting", {
      setItem: SET_ITEM
    }),

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
    this.$emit("update-progress", true);

    NewYearDishesSettingService.fetch().subscribe(
      (setting: NewYearDishesSetting) => {
        this.setting = setting;
        this.setItem(setting);
      },
      () => {
        this.$emit("initialize-failed");
      }
    );
  },
  beforeMount() {
    if (!this.isAccessible) {
      this.$router.push({ name: "forbidden" });
    }
  },
  mounted() {
    const observable_1 = NewYearDishesSettingService.fetch();
    const observable_2 = NewYearDishesReservationService.fetchReceptions();
    const observables$: Array<
      Observable<NewYearDishesSetting> | Observable<number> | Observable<NewYearDishesReservation>
    > = [observable_1, observable_2];

    observable_1.subscribe((setting: NewYearDishesSetting) => (this.setting = setting));
    observable_2.subscribe((receptions: number) => (this.receptions = receptions));

    if (!isEmpty(this.id)) {
      const observable_3 = NewYearDishesReservationService.fetchById(this.id);
      observable_3.subscribe((reservation: NewYearDishesReservation) => (this.reservation = reservation));
      observables$.push(observable_3);
    }

    zip(observables$)
      .pipe(tap(() => this.$emit("update-progress", false)))
      .subscribe(
        () => this.$emit("update-accessible", this.isAccessible),
        () => this.$emit("initialize-failed")
      );

    /*if (!isEmpty(this.id)) {
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
    }*/
  }
});
