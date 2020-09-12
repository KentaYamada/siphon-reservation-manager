import { ReservationListSeat } from "@/entity/reservation-list-seat";

/**
 * Reservation list seat entity
 */
export interface ReservationList {
  reservation_date: Date;
  reservation_time: Date;
  seats: Array<ReservationListSeat>;
}
