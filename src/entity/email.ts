/**
 * Email message templates
 */
export enum EMAIL_MESSAGE_TEMPLATES {
  CREATED,
  EDITED,
  CANCELED
}

/**
 * Email entity
 */
export interface Email {
  destination: string;
  subject: string;
  message: string;
  reservation_id?: string;
  reserver_name: string;
}
