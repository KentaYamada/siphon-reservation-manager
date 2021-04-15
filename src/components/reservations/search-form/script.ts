import Vue, { PropType } from "vue";
import { BusinessDay } from "@/entity/business-day";
import { ReservationSearchOption } from "@/entity/reservation-search-option";
import { SelectableTimezone } from "@/entity/selectable-timezone";
import { formatDateJp } from "@/filters/format-date-jp";
import { timePeriod } from "@/filters/time-period";

/**
 * Reservation list search form
 */
export default Vue.extend({
  name: "reservation-list-search-form",
  props: {
    businessDays: {
      required: true,
      type: Array as PropType<Array<BusinessDay>>
    },
    searchOption: {
      required: true,
      type: Object as PropType<ReservationSearchOption>
    },
    timezones: {
      required: true,
      type: Array as PropType<Array<SelectableTimezone>>
    }
  },
  methods: {
    handleSearch(): void {
      this.$emit("search");
    },

    handleUpdateReservationDate(reservationDateId: string): void {
      this.$emit("update-reservation-date", reservationDateId);
    },

    handleUpdateReservationTime(reservationTimeId: string): void {
      this.$emit("update-reservation-time", reservationTimeId);
    }
  },
  filters: {
    formatDateJp,
    timePeriod
  },
  template: "<reservation-search-form/>"
});
