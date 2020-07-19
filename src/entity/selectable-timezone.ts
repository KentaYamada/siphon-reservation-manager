/**
 * Selectable Timezone entity
 */
export interface SelectableTimezone {
  id?: string;
  start_time: Date;
  end_time: Date;
  selected: boolean;
}
