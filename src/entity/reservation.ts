/**
 * Reservation entity
 */
export interface Reservation {
  id: number;
  reservation_date: string;
  reservation_time: string;
  reserver_name: string;
  number_of_reservations: number;
  tel: string;
  mail: string;
}
