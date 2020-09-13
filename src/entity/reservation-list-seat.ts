/**
 * Reservation list seat entity
 */
export interface ReservationListSeat {
  seat_no: number;
  reservation_id: string;
  reserver_name: string;
  number_of_reservations: number;
  mail: string;
  tel: string;
  comment: string;
}
