import { ReservationSeat } from "@/entity/reservation-seat";

/**
 * Reservation entity
 */
export interface Reservation {
  id: number;
  reservation_date: string;
  reservation_time: string;
  reserver_name: string;
  reservation_seats: ReservationSeat[];
  number_of_reservations: number;
  tel: string;
  mail: string;
}
