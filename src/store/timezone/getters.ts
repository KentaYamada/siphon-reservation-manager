import { GetterTree } from "vuex";
import { Timezone } from "@/entity/timezone";
import { RootState } from "@/store";
import { GET_TIMEZONES } from "@/store/constant";
import { TimezoneState } from "@/store/timezone";

const getters: GetterTree<TimezoneState, RootState> = {
  [GET_TIMEZONES]: (state: TimezoneState): Timezone[] => {
    // during implementation
    const timezones: Timezone[] = [];
    timezones.push({ id: 1, text: "11:00 - 12:00" });
    timezones.push({ id: 2, text: "12:30 - 13:30" });
    timezones.push({ id: 3, text: "14:00 - 15:00" });
    timezones.push({ id: 4, text: "15:30 - 16:30" });
    timezones.push({ id: 5, text: "17:00 - 18:00" });

    return timezones;
  }
};

export default getters;
