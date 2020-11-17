import Vue from "vue";
import VueRouter, { RouteConfig, Route } from "vue-router";

// Routing URL
import {
  INDEX_URL,
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
  HELP_MAIL_UNREACHED,
  NEW_YEAR_DISHED_RESERVATION_LIST_URL,
  NEW_YEAR_DISHES_RESERVATION_ENTRY_URL,
  NEW_YEAR_DISHES_RESERVED_MESSAGE_URL,
  NEW_YEAR_DISHES_RESERVATION_DETAIL_URL,
  NEW_YEAR_DISHES_RESERVATION_EDIT_URL,
  NEW_YEAR_DISHES_RESERVATION_EDITED_MESSAGE_URL,
  NEW_YEAR_DISHES_RESERVATION_CANCELED_URL,
  NEW_YEAR_DISHES_SETTING_URL
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
    path: FORBIDDEN_URL,
    name: "forbidden",
    component: () => import(/* webpackChunkName: "forbidden" */ "@/views/forbidden/Forbidden.vue")
  },
  {
    path: HELP_MAIL_UNREACHED,
    name: "help-mail-unreached",
    component: HelpMailUnreached
  },
  {
    path: NEW_YEAR_DISHED_RESERVATION_LIST_URL,
    name: "new-year-dishes-reservation-list",
    component: () =>
      import(
        /* webpackChunkName: "new-year-dishes-reservation-list" */ "@/views/new-year-dishes-reservations/list/NewYearDishesReservationListView.vue"
      ),
    meta: {
      requireAuth: true
    }
  },
  {
    path: NEW_YEAR_DISHES_RESERVATION_ENTRY_URL,
    name: "new-year-dishes-reservation-entry",
    component: () =>
      import(
        /* webpackChunkName: "new-year-dishes-reservation-entry" */ "@/views/new-year-dishes-reservations/entry/NewYearDishesReservationEntryView.vue"
      )
  },
  {
    path: NEW_YEAR_DISHES_RESERVED_MESSAGE_URL,
    name: "new-year-dishes-reserved-message",
    props: (router: Route) => ({
      id: router.params.id
    }),
    component: () =>
      import(
        /* webpackChunkName: "new-year-dishes-reserved-message" */ "@/views/new-year-dishes-reservations/reserved-message/NewYearDishesReservedMessageView.vue"
      )
  },
  {
    path: NEW_YEAR_DISHES_RESERVATION_DETAIL_URL,
    name: "new-year-dishes-reservation-detail",
    props: (router: Route) => ({
      id: router.params.id
    }),
    component: () =>
      import(
        /* webpackChunkName: "new-year-dishes-reservation-detail" */ "@/views/new-year-dishes-reservations/detail/NewYearDishesReservationDetailView.vue"
      )
  },
  {
    path: NEW_YEAR_DISHES_RESERVATION_EDIT_URL,
    name: "new-year-dishes-reservation-edit",
    props: (router: Route) => ({
      id: router.params.id
    }),
    component: () =>
      import(
        /* webpackChunkName: "new-year-dishes-reservation-edit" */ "@/views/new-year-dishes-reservations/edit/NewYearDishesReservationEditView.vue"
      )
  },
  {
    path: NEW_YEAR_DISHES_RESERVATION_EDITED_MESSAGE_URL,
    name: "new-year-dishes-reservation-edited-message",
    props: (router: Route) => ({
      id: router.params.id
    }),
    component: () =>
      import(
        /* webpackChunkName: "new-year-dishes-reservation-edited-message" */ "@/views/new-year-dishes-reservations/edited-message/NewYearDishesReservationEditedMessageView.vue"
      )
  },
  {
    path: NEW_YEAR_DISHES_RESERVATION_CANCELED_URL,
    name: "new-year-dishes-reservation-canceled-message",
    props: (router: Route) => ({
      id: router.params.id
    }),
    component: () =>
      import(
        /* webpackChunkName: "new-year-dishes-reservation-edited-message" */ "@/views/new-year-dishes-reservations/canceled-message/NewYearDishesReservationCanceledMessageView.vue"
      )
  },
  {
    path: NEW_YEAR_DISHES_SETTING_URL,
    name: "new-year-dishes-setting",
    component: () =>
      import(
        /* webpackChunkName: "new-year-dishes-setting" */ "@/views/new-year-dishes-settings/NewYearDishesSettingView.vue"
      ),
    meta: {
      requireAuth: true
    }
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
