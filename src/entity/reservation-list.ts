import { Reservation } from "@/entity/reservation";

/**
 * Reservation list seat entity
 */
export interface ReservationList {
  id: string;
  reservation_date: Date;
  reservation_date_id: string;
  reservation_start_time: Date;
  reservation_end_time: Date;
  reservation_time_id: string;
  seats: Array<Reservation>;
}
