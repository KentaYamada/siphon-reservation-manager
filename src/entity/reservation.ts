<<<<<<< Updated upstream
import { ReservationSeat } from "@/entity/reservation-seat";

=======
>>>>>>> Stashed changes
/**
 * Reservation entity
 */
export interface Reservation {
  id: number;
<<<<<<< Updated upstream
  reservation_date: string;
  reservation_time: string;
  reserver_name: string;
  reservation_seats: ReservationSeat[];
  number_of_reservations: number;
  tel: string;
  mail: string;
=======
  reservation_date: Date;
  reservation_time_zone: string;
  number_of_reservation: number;
  tables: number[];
  reserver: string;
  tel: string;
  email: string;
  comment: string;
>>>>>>> Stashed changes
}
