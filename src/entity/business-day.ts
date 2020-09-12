import { SelectableTimezone } from "@/entity/selectable-timezone";

/**
 * Business day entity
 */
export interface BusinessDay {
  id?: string;
  business_date: Date;
  published_datetime: Date | null;
  is_pause: boolean;
  timezones?: Array<SelectableTimezone>;
}
