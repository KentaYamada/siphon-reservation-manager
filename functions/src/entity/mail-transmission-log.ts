/**
 * Mail transmission log entity
 */
export interface MailTransmissionLog {
  send_datetime: Date;
  reserver_name: string;
  mail: string;
  redirect_url: string;
  type: string;
  type_name: string;
  result: string;
  created_at: Date;
}
