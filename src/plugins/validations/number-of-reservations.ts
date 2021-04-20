import { ReservationSeat } from "@/entity/reservation-seat";

export const numberOfReservations = (value: number) => (param: Array<ReservationSeat>): boolean => {
  const selectedSeats = param.filter(p => p.is_selected);
  const max = selectedSeats.length * 2;
  const min = max - 1;

  return min <= value && value <= max;
};
