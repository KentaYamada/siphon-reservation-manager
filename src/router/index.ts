import Vue from "vue";
import VueRouter, { RouteConfig, Route } from "vue-router";

// Routing URL
import {
  INDEX_URL,
  RESERVATION_ENTRY_URL,
  RESERVATION_DETAIL_URL,
  RESERVED_MESSAGE_URL,
  MANAGEMENT_DASHBOARD_URL,
  MANAGEMENT_RESERVATION_LIST_URL,
  MANAGEMENT_RESERVATION_SETTING_URL,
  MANAGEMENT_LOGIN_URL,
  FORBIDDEN_URL
} from "@/router/url";

// Reservation
import ReservationEntry from "@/views/reservations/reservation-entry/ReservationEntry.vue";
import ReservationDetail from "@/views/reservations/reservation-detail/ReservationDetail.vue";
import ReservaedMessage from "@/views/reservations/reserved-message/ReservedMessage.vue";

// Management
import Dashboard from "@/views/managements/dashboard/Dashboard.vue";
import Login from "@/views/managements/login/Login.vue";
import ReservationList from "@/views/managements/reservation-list/ReservationList.vue";
import ReservationSetting from "@/views/managements/reservation-setting/ReservationSetting.vue";

// Other
import Forbidden from "@/views/forbidden/Forbidden.vue";
import NotFound from "@/views/notfound/NotFound.vue";

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: INDEX_URL,
    redirect: {
      name: "reservation-entry"
    }
  },
  {
    path: RESERVATION_ENTRY_URL,
    name: "reservation-entry",
    component: ReservationEntry
  },
  {
    path: `${RESERVATION_DETAIL_URL}/:id`,
    name: "reservation-detail",
    component: ReservationDetail,
    props: (router: Route) => ({
      id: parseInt(router.params.id, 10)
    })
  },
  {
    path: RESERVED_MESSAGE_URL,
    name: "reserved-message",
    component: ReservaedMessage
  },
  {
    path: MANAGEMENT_RESERVATION_LIST_URL,
    name: "reservation-list",
    component: ReservationList
  },
  {
    path: MANAGEMENT_DASHBOARD_URL,
    name: "management-dashborad",
    component: Dashboard
  },
  {
    path: MANAGEMENT_RESERVATION_SETTING_URL,
    name: "reservation-setting",
    component: ReservationSetting
  },
  {
    path: MANAGEMENT_LOGIN_URL,
    name: "login",
    component: Login
  },
  {
    path: FORBIDDEN_URL,
    name: "forbidden",
    component: Forbidden
  },
  {
    path: "*",
    name: "notfound",
    component: NotFound
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
