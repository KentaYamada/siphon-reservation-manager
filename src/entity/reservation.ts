/**
 * Reservation entity
 */
export interface Reservation {
  id?: string;
  reservation_date_id: string;
  reservation_date: Date | null;
  reservation_timezone_id: string;
  reservation_start_time: Date | null;
  reservation_end_time: Date | null;
  reserver_name: string;
  number_of_reservations: number;
  tel: string;
  mail: string;
  comment: string;
}
