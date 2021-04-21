/**
 * Mail transmission log entity
 */
export interface MailTransmissionLog {
  id: string;
  mail: string;
  redirect_url: string;
  reserver_name: string;
  send_datetime: Date;
  type: string;
  type_name: string;
}
