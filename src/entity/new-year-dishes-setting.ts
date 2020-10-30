/**
 * NewYearDishesSetting entity
 */
export interface NewYearDishesSetting {
  id?: string;
  start_datetime: Date;
  end_datetime: Date;
  receptions: number;
  is_pause: boolean;
  image: string | null;
}
