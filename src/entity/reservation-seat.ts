/**
 * Reservation seat entity
 */
export interface ReservationSeat {
  id: number | null;
  seat_no: number;
  is_reserved: boolean;
}
