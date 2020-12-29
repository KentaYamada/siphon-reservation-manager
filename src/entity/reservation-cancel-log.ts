/**
 * Reservation cancel log entity
 */
export interface ReservationCancelLog {
  id: string;
  canceled_at: Date;
  reservation_id: string;
  reservation_date: Date;
  reserver_name: string;
  mail: string;
  tel: string;
  seats: Array<number>;
}
