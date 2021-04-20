import { ReservationSeat } from "@/entity/reservation-seat";
import { numberOfReservations } from "@/plugins/validations/number-of-reservations";

describe("Number of reservations validation rule tests", () => {
  describe("select seat test cases", () => {
    const seats: Array<ReservationSeat> = [
      {
        is_selected: true,
        is_reserved: false,
        reservation_date_id: "",
        reservation_id: "",
        reservation_time_id: "",
        seat_no: 1
      }
    ];

    it.each([1, 2])("[positive] reservation people within range", (value: number) => {
      expect(numberOfReservations(value)(seats)).toBeTruthy();
    });

    it.each([0, 3, 4, 5, 6, 7, 8, 9])("[negative] reservation people out of range", (value: number) => {
      expect(numberOfReservations(value)(seats)).toBeFalsy();
    });
  });

  describe("select two seats test cases", () => {
    const seats: Array<ReservationSeat> = [
      {
        is_selected: true,
        is_reserved: false,
        reservation_date_id: "",
        reservation_id: "",
        reservation_time_id: "",
        seat_no: 1
      },
      {
        is_selected: true,
        is_reserved: false,
        reservation_date_id: "",
        reservation_id: "",
        reservation_time_id: "",
        seat_no: 2
      }
    ];

    it.each([3, 4])("[positive] reservation people within range", (value: number) => {
      expect(numberOfReservations(value)(seats)).toBeTruthy();
    });

    it.each([0, 1, 2, 5, 6, 7, 8, 9])("[negative] reservation people out of range", (value: number) => {
      expect(numberOfReservations(value)(seats)).toBeFalsy();
    });
  });

  describe("select three seats test cases", () => {
    const seats: Array<ReservationSeat> = [
      {
        is_selected: true,
        is_reserved: false,
        reservation_date_id: "",
        reservation_id: "",
        reservation_time_id: "",
        seat_no: 1
      },
      {
        is_selected: true,
        is_reserved: false,
        reservation_date_id: "",
        reservation_id: "",
        reservation_time_id: "",
        seat_no: 2
      },
      {
        is_selected: true,
        is_reserved: false,
        reservation_date_id: "",
        reservation_id: "",
        reservation_time_id: "",
        seat_no: 3
      }
    ];

    it.each([5, 6])("[positive] reservation people within range", (value: number) => {
      expect(numberOfReservations(value)(seats)).toBeTruthy();
    });

    it.each([0, 1, 2, 3, 4, 7, 8, 9])("[negative] reservation people out of range", (value: number) => {
      expect(numberOfReservations(value)(seats)).toBeFalsy();
    });
  });

  describe("select four seats test cases", () => {
    const seats: Array<ReservationSeat> = [
      {
        is_selected: true,
        is_reserved: false,
        reservation_date_id: "",
        reservation_id: "",
        reservation_time_id: "",
        seat_no: 1
      },
      {
        is_selected: true,
        is_reserved: false,
        reservation_date_id: "",
        reservation_id: "",
        reservation_time_id: "",
        seat_no: 2
      },
      {
        is_selected: true,
        is_reserved: false,
        reservation_date_id: "",
        reservation_id: "",
        reservation_time_id: "",
        seat_no: 3
      },
      {
        is_selected: true,
        is_reserved: false,
        reservation_date_id: "",
        reservation_id: "",
        reservation_time_id: "",
        seat_no: 4
      }
    ];

    it.each([7, 8])("[positive] reservation people within range", (value: number) => {
      expect(numberOfReservations(value)(seats)).toBeTruthy();
    });

    it.each([0, 1, 2, 3, 4, 5, 6, 9])("[negative] reservation people out of range", (value: number) => {
      expect(numberOfReservations(value)(seats)).toBeFalsy();
    });
  });

  describe("no selected seat test cases", () => {
    const seats: Array<ReservationSeat> = [];

    it.each([1, 2, 3, 4, 5, 6, 7, 8, 9])("[positive] should be invalid", (value: number) => {
      expect(numberOfReservations(value)(seats)).toBeFalsy();
    });
  });
});
