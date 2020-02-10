import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import ReservationEntry from "@/views/reservations/reservation-entry/ReservationEntry.vue";
import ReservationDetail from "@/views/reservations/reservation-detail/ReservationDetail.vue";
import ReservaedMessage from "@/views/reservations/reserved-message/ReservedMessage.vue";
import Login from "@/views/managements/login/Login.vue";
import Forbidden from "@/views/forbidden/Forbidden.vue";
import NotFound from "@/views/notfound/NotFound.vue";

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  //{
  //  path: "/",
  //  name: "Home",
  //  component: Home
  //},
  {
    path: "/",
    name: "reservation-entry",
    component: ReservationEntry
  },
  {
    path: "/reservations/reserved",
    name: "reserved-message",
    component: ReservaedMessage
  },
  {
    path: "/reservations/detail/:id",
    name: "reservation-detail",
    component: ReservationDetail
  },
  {
    path: "/managements",
    name: "login",
    component: Login
  },
  {
    path: "/forbidden",
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
