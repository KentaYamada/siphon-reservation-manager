/**
 * Reservation seat entity
 */
export interface ReservationSeat {
  id: number | null;
  /** 座席番号 */
  seat_no: number;
  /** 予約済かどうか */
  is_reserved: boolean;
  /** 予約するかどうか */
  is_selected: boolean;
}
