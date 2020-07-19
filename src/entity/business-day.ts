import { SelectableTimezone } from "@/entity/selectable-timezone";

/**
 * Business day entity
 */
export interface BusinessDay {
  id?: string;
  text: string;
  business_date: Date;
  timezones?: Array<SelectableTimezone>;
}
