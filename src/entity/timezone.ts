/**
 * Timezone entity
 */
export interface Timezone {
  id?: string;
  start_time: Date;
  end_time: Date;
  is_default_select: boolean;
}
