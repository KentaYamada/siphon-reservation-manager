import Vue, { PropType } from "vue";
import SelectableReservationSeatList from "@/components/reservation-seats/selectable-list/SelectableReservationSeatList.vue";
import { BusinessDay } from "@/entity/business-day";
import { Reservation } from "@/entity/reservation";
import { SelectableTimezone } from "@/entity/selectable-timezone";
import { formatDateJp } from "@/filters/format-date-jp";
import { timePeriod } from "@/filters/time-period";

/**
 * Reservation form component
 */
export default Vue.extend({
  name: "reservation-form",
  components: {
    SelectableReservationSeatList
  },
  props: {
    businessDays: {
      required: true,
      type: Array as PropType<Array<BusinessDay>>
    },
    isFullOfReservations: {
      required: true,
      type: Boolean
    },
    isLoadingSeats: {
      required: true,
      type: Boolean
    },
    isSelectedSeats: {
      required: true,
      type: Boolean
    },
    reservation: {
      required: true,
      type: Object as PropType<Reservation>
    },
    reservablePeople: {
      required: true,
      type: Number
    },
    timezones: {
      required: true,
      type: Array as PropType<Array<SelectableTimezone>>
    },
    validations: {
      required: true,
      type: Object
    },
    visibleReservationSeats: {
      required: true,
      type: Boolean
    }
  },
  filters: {
    formatDateJp,
    timePeriod
  },
  methods: {
    handleUpdateComment(comment: string): void {
      this.$emit("update-comment", comment);
    },

    handleUpdateMail(mail: string): void {
      this.$emit("update-mail", mail);
    },

    handleUpdateNumberOfReservations(numberOfReservations: string): void {
      this.$emit("update-number-of-reservations", parseInt(numberOfReservations));
    },

    handleUpdateReservationDate(reservationDateId: string): void {
      this.$emit("update-reservation-date", reservationDateId);
    },

    handleUpdateReservationSeat(seatNo: number): void {
      this.$emit("update-reservation-seat", seatNo);
    },

    handleUpdateReservationTime(reservationTimeId: string): void {
      this.$emit("update-reservation-time", reservationTimeId);
    },

    handleUpdateReserverName(reserverName: string): void {
      this.$emit("update-reserver-name", reserverName);
    },

    handleUpdateTel(tel: string): void {
      this.$emit("update-tel", tel);
    }
  },
  template: "<reservation-form/>"
});
