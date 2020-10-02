/**
 * Reserver list seat entity
 */
export interface Reserver {
  seat_no: number;
  seat_nos: Array<number>;
  reservation_id: string;
  reserver_name: string;
  reservation_date: Date;
  reservation_date_id: string;
  reservation_start_time: Date;
  reservation_end_time: Date;
  reservation_time_id: string;
  number_of_reservations: number;
  mail: string;
  tel: string;
  comment: string;
}
