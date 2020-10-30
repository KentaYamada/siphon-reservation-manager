/**
 * NewYearDishesSetting entity
 */
export interface NewYearDishesSetting {
  id?: string;
  start_date: Date;
  end_date: Date;
  receptions: number;
  is_pause: boolean;
  image: string | null;
}
