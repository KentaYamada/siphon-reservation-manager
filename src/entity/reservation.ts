import { ReservationSeat } from "@/entity/reservation-seat";

/**
 * Reservation entity
 */
export interface Reservation {
  id: number | null;
  reservation_date: Date;
  reservation_time: string;
  reserver_name: string;
  reservation_seats: ReservationSeat[];
  number_of_reservations: number;
  tel: string;
  mail: string;
  comment: string;
}
