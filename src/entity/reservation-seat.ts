/**
 * Reservation seat entity
 */
export interface ReservationSeat {
  id?: string;
  seat_no: number;
  is_reserved: boolean;
  is_selected: boolean;
  reservation_id: string;
  reservation_date: Date | null;
  reservation_date_id: string;
  reservation_start_time: Date | null;
  reservation_end_time: Date | null;
  reservation_time_id: string;
}
