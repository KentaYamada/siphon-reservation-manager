// General actions
export const DELETE = "delete";

export const FETCH = "fetch";

export const FETCH_BY_ID = "fetchById";

export const GET_BY_ID = "getById";

export const INITIALIZE = "initialize";

export const HAS_ITEMS = "hasItems";

export const SAVE = "save";

export const SET_ITEM = "setItem";

export const SET_ITEMS = "setItems";

// Auth actions
export const SIGN_IN = "signIn";

export const SIGN_OUT = "signOut";

export const IS_ADMIN = "isAdmin";

export const IS_SIGNED_IN = "isSignedIn";

export const GET_NAVIGATIONS = "getNavigations";

// Business day actions
export const FETCH_BUSINESS_DATE_AFTER_TODAY = "fetchBusinessDateAfterToday";

export const FETCH_RESERVABLE_BUSINESS_DAYS = "fetchReservableBusinessDays";

export const FETCH_SELECTABLE_TIMEZONES = "fetchSelectableTimezones";

export const GET_SELECTABLE_TIMEZONES = "getSelectableTimezones";

export const GET_SELECTED_TIMEZONE = "getSelectedTimezone";

export const SET_SELECTABLE_TIMEZONES = "setSelectableTimezones";

// Reservation actions
export const CANCEL = "cancel";

export const FETCH_RESERVATION_SEATS = "fetchReservationSeats";

export const GET_RESERVABLE_PEOPLE = "getReservablePeople";

export const HAS_RESERVATION_SEATS = "hasReservationSeats";

export const HAS_SELECTED_SEATS = "hasSelectedSeats";

export const INITIALIZE_RESERVATION_SEATS = "initializeReservationSeats";

export const IS_FULL_OF_RESERVED = "isFullOfReserved";

export const RESET_RESERVATION_SEATS = "resetReservationSeats";

export const RESET_RESERVATION_TIMEZONE = "resetReservationTimezone";

export const SET_RESERVATION_SEAT = "setReservationSeat";

export const SET_RESERVATION_SEATS = "setReservationSeats";

export const SET_RESERVATION_DATE = "setReservationDate";

export const SET_RESERVATION_TIMEZONE = "setReservationTimezone";

export const VISIBLE_ACTIONS = "visibleActions";

export const CAN_RESERVED = "canReserved";

// Reservation seat actions
export const GET_RESERVABLE_SEATS = "getReservableSeats";

// Timezone
export const GET_RESERVABLE_TIMEZONES = "getReservableTimezones";

export const GET_TIMEZONES_BY_RESERVATION_DATE = "getTimezonesByReservationDate";
