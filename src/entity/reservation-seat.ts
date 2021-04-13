/**
 * Reservation seat entity
 */
export interface ReservationSeat {
  id: string;
  seat_no: number;
  is_reserved: boolean;
  is_selected: boolean;
}
