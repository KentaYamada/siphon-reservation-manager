import Vue from "vue";
import VueRouter, { RouteConfig, Route } from "vue-router";
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
    component: () =>
      import(/* webpackChunkName: "reservation-entry" */ "@/views/reservations/entry/ReservationEntry.vue")
  },
  {
    path: RESERVED_MESSAGE_URL,
    name: "reserved-message",
    props: (router: Route) => ({
      id: router.params.id
    }),
    component: () =>
      import(/* webpackChunkName: "reserved-message" */ "@/views/reservations/reserved-message/ReservedMessage.vue")
  },
  {
    path: RESERVATION_DETAIL_URL.concat("/:id"),
    name: "reservation-detail",
    props: (router: Route) => ({
      id: router.params.id
    }),
    component: () =>
      import(/* webpackChunkName: "reservation-detail" */ "@/views/reservations/detail/ReservationDetail.vue")
  },
  {
    path: RESERVATION_EDIT_URL.concat("/:id"),
    name: "reservation-edit",
    props: (router: Route) => ({
      id: router.params.id
    }),
    component: () => import(/* webpackChunkName: "reservation-edit" */ "@/views/reservations/edit/ReservationEdit.vue")
  },
  {
    path: RESERVATION_EDITED_URL.concat("/:id"),
    name: "reservation-edited-message",
    props: (router: Route) => ({
      id: router.params.id
    }),
    component: () =>
      import(
        /* webpackChunkName: "reservation-edited-message" */ "@/views/reservations/edited-message/ReservationEditedMessage.vue"
      )
  },
  {
    path: RESERVATION_CANCELED_URL,
    name: "reservation-canceled-message",
    component: () =>
      import(
        /* webpackChunkName: "reservation-canceled-message" */ "@/views/reservations/canceled-message/ReservationCanceledMessage.vue"
      )
  },
  {
    path: MANAGEMENT_RESERVATION_LIST_URL,
    name: "reservation-list",
    meta: {
      requireAuth: true
    },
    component: () => import(/* webpackChunkName: "reservation-list" */ "@/views/reservations/list/ReservationList.vue")
  },
  {
    path: MANAGEMENT_LOGIN_URL,
    name: "login",
    component: () => import(/* webpackChunkName: "login" */ "@/views/managements/login/Login.vue")
  },
  {
    path: SHOP_SETTING_URL,
    name: "shop",
    meta: {
      requireAuth: true
    },
    component: () => import(/* webpackChunkName: "shop" */ "@/views/managements/shop/Shop.vue")
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
    path: NEW_YEAR_DISHED_RESERVATION_LIST_URL,
    name: "new-year-dishes-reservation-list",
    meta: {
      requireAuth: true
    },
    component: () =>
      import(
        /* webpackChunkName: "new-year-dishes-reservation-list" */ "@/views/new-year-dishes-reservations/list/NewYearDishesReservationListView.vue"
      )
  },
  {
    path: NEW_YEAR_DISHES_SETTING_URL,
    name: "new-year-dishes-setting",
    meta: {
      requireAuth: true
    },
    component: () =>
      import(
        /* webpackChunkName: "new-year-dishes-setting" */ "@/views/new-year-dishes-settings/NewYearDishesSettingView.vue"
      )
  },
  {
    path: HELP_MAIL_UNREACHED,
    name: "help-mail-unreached",
    component: () => import(
      /* webpackChunkName: "help-mail-unreached" */ "@/views/helps/mail-unreached/HelpMailUnreached.vue"
    )
  },
  {
    path: FORBIDDEN_URL,
    name: "forbidden",
    component: () => import(/* webpackChunkName: "forbidden" */ "@/views/forbidden/Forbidden.vue")
  },
  {
    path: "*",
    name: "notfound",
    component: () => import(/* webpackChunkName: "notfound" */ "@/views/notfound/NotFound.vue")
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
