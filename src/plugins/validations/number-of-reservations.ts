import { ReservationSeat } from "@/entity/reservation-seat";

export const numberOfReservations = (param: Array<ReservationSeat>) => (value: number): boolean => {
  const selectedSeats = param.filter(p => p.is_selected);
  const max = selectedSeats.length * 2;
  const min = max - 1;

  return min <= value && value <= max;
};
