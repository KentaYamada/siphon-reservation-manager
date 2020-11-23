import { Reservation } from "@/entity/reservation";

export interface ReservationByDate {
  reservation_date: Date;
  reservation_date_id: string;
  reservation_start_time: Date;
  reservation_end_time: Date;
  reservation_time_id: string;
  reservations: Array<Reservation>;
}
