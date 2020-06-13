import Vue, { PropType } from "vue";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";

// entity
import { Reservation } from "@/entity/reservation";

// store
import {
  FETCH,
  FETCH_ALL_RESERVED_TIMEZONES,
  GET_BY_ID,
  SET_RESERVATION_DATE,
  SET_RESERVATION_TIMEZONE
} from "@/store/constant";

export default Vue.extend({
  template: "<reservation-all-reserved-form/>"
});
