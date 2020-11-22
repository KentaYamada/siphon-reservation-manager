/**
 * Reservation seat entity
 */
export interface ReservationSeat {
  seat_no: number;
  is_reserved: boolean;
  is_selected: boolean;
  reservation_id: string;
}
