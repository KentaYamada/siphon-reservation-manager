import { ReservationSeat } from "@/entity/reservation-seat";

/**
 * Reservation entity
 */
export interface Reservation {
  id?: string;
  reservation_date: Date | null;
  reservation_date_id: string;
  reservation_start_time: Date | null;
  reservation_end_time: Date | null;
  reservation_time_id: string;
  reserver_name: string;
  reservation_seats: ReservationSeat[];
  number_of_reservations: number | null;
  tel: string;
  mail: string;
  comment: string;
  seats: Array<number>;
}
