import Vue from "vue";
import VueRouter, { RouteConfig, Route } from "vue-router";

// Routing URL
import {
  INDEX_URL,
  EMAIL_MESSAGE_LIST_URL,
  RESERVATION_CANCELED_URL,
  RESERVATION_EDIT_URL,
  RESERVATION_EDITED_URL,
  RESERVATION_ENTRY_URL,
  RESERVATION_DETAIL_URL,
  RESERVED_MESSAGE_URL,
  MANAGEMENT_RESERVATION_LIST_URL,
  SHOP_SETTING_URL,
  MANAGEMENT_LOGIN_URL,
  FORBIDDEN_URL,
  HELP_MAIL_UNREACHED
} from "@/router/url";

// Reservation
import ReservationCanceledMessage from "@/views/reservations/canceled-message/ReservationCanceledMessage.vue";
import ReservationDetail from "@/views/reservations/detail/ReservationDetail.vue";
import ReservationEdit from "@/views/reservations/edit/ReservationEdit.vue";
import ReservationEditedMessage from "@/views/reservations/edited-message/ReservationEditedMessage.vue";
import ReservationEntry from "@/views/reservations/entry/ReservationEntry.vue";
import ReservationList from "@/views/reservations/list/ReservationList.vue";
import ReservedMessage from "@/views/reservations/reserved-message/ReservedMessage.vue";

// Management
import Login from "@/views/managements/login/Login.vue";
import Shop from "@/views/managements/shop/Shop.vue";

// Help
import HelpMailUnreached from "@/views/helps/mail-unreached/HelpMailUnreached.vue";

// Other
import Forbidden from "@/views/forbidden/Forbidden.vue";
import NotFound from "@/views/notfound/NotFound.vue";

// store
import store from "@/store";

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
    path: `${RESERVATION_EDIT_URL}/:id`,
    name: "reservation-edit",
    component: ReservationEdit,
    props: (router: Route) => ({
      id: router.params.id
    })
  },
  {
    path: `${RESERVATION_EDITED_URL}/:id`,
    name: "reservation-edited-message",
    component: ReservationEditedMessage,
    props: (router: Route) => ({
      id: router.params.id
    })
  },
  {
    path: `${RESERVATION_DETAIL_URL}/:id`,
    name: "reservation-detail",
    component: ReservationDetail,
    props: (router: Route) => ({
      id: router.params.id
    })
  },
  {
    path: RESERVED_MESSAGE_URL,
    name: "reserved-message",
    component: ReservedMessage,
    props: (router: Route) => ({
      id: router.params.id
    })
  },
  {
    path: RESERVATION_CANCELED_URL,
    name: "reservation-canceled-message",
    component: ReservationCanceledMessage
  },
  {
    path: MANAGEMENT_RESERVATION_LIST_URL,
    name: "reservation-list",
    meta: {
      requireAuth: true
    },
    component: ReservationList
  },
  {
    path: SHOP_SETTING_URL,
    name: "shop",
    meta: {
      requireAuth: true
    },
    component: Shop
  },
  {
    path: MANAGEMENT_LOGIN_URL,
    name: "login",
    component: Login
  },
  {
    path: EMAIL_MESSAGE_LIST_URL,
    name: "email-message-list",
    component: () =>
      import(/* webpackChunkName: "email-message-list" */ "@/views/email-messages/list/EmailMessageListView.vue"),
    meta: {
      requireAuth: true
    }
  },
  {
    path: FORBIDDEN_URL,
    name: "forbidden",
    component: Forbidden
  },
  {
    path: HELP_MAIL_UNREACHED,
    name: "help-mail-unreached",
    component: HelpMailUnreached
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

router.beforeEach((to: Route, from: Route, next) => {
  const requireAuth = to.matched.some(record => record.meta.requireAuth);
  const isSignedIn = store.getters["auth/isSignedIn"];

  if (requireAuth) {
    if (isSignedIn) {
      next();
    } else {
      next(MANAGEMENT_LOGIN_URL);
    }
  } else {
    next();
  }
});

export default router;
