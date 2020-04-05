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
  number_of_reservations: number;
  tel: string;
  mail: string;
  comment: string;
}
