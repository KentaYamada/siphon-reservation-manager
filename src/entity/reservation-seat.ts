/**
 * Reservation seat entity
 */
export interface ReservationSeat {
  seat_no: number;
  is_reserved: boolean;
  is_selected: boolean;
  reservation_date_id?: string;
  reservation_id?: string;
  reservation_time_id?: string;
}
