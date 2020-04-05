/**
 * Reservation entity
 */
export interface Reservation {
  id?: string;
  reservation_date: Date | null;
  reservation_start_time: Date | null;
  reservation_end_time: Date | null;
  reserver_name: string;
  number_of_reservations: number;
  tel: string;
  mail: string;
  comment: string;
}
