/**
 * NewYearDishesSetting entity
 */
export interface NewYearDishesSetting {
  id?: string;
  start_datetime: Date;
  end_datetime: Date;
  delivery_date: Date;
  delivery_time_from: Date;
  delivery_time_to: Date;
  receptions: number;
  max_quantity_per_reservation: number;
  is_pause: boolean;
  image: string | null;
}
