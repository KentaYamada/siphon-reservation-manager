import { Page } from "@/entity/page";

/**
 * Mail transmission log search option
 */
export interface MailTransmissionLogSearchOption {
  page: Page;
  keyword: string;
  send_date: Date | null;
}
