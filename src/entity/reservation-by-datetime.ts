import { Reservation } from "@/entity/reservation";
import { ReservationSeat } from "@/entity/reservation-seat";

/**
 * Reservation by date time entity
 */
export interface ReservationByDateTime {
  reservation_date: Date;
  reservation_date_id: string;
  reservation_start_time: Date;
  reservation_end_time: Date;
  reservation_time_id: string;
  seats: Array<ReservationSeat>;
  reservations: Array<Reservation>;
}
