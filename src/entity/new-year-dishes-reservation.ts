/**
 * New year dishes reservation entity
 */
export interface NewYearDishesReservation {
  id: string;
  quantity: number;
  reserver_name: string;
  address: string;
  tel: string;
  mail: string;
  comment: string;
  is_delivered: boolean;
}
