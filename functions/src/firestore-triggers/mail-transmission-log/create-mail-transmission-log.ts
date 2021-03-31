
import * as functions from "firebase-functions";
import * as Mail from "nodemailer/lib/mailer";
import {
  getReservedMessage,
  getReservationEditedMessage,
  getReservationCanceledMessage
} from "../../email-message";
import { MailMessage } from "../../entity/mail-message";
import { MailTransmissionLog } from "../../entity/mail-transmission-log";
import { GmailService } from "../../service/gmail-service";

/**
 * Trigger create mail transmission log document
 */
export const onCreateMailTransmissionLog = functions.firestore.document("mail_transmission_logs/{document}").onCreate(snap => {
    const data = snap.data() as MailTransmissionLog;
    let mailMessage: MailMessage | null = null;

    switch (data.type) {
      case "create_reservation":
        mailMessage = getReservedMessage(data);
        break;
      case "edit_reservation":
        mailMessage = getReservationEditedMessage(data);
        break;
      case "cancel_reservation":
        mailMessage = getReservationCanceledMessage(data);
        break;
      default:
        mailMessage = null;
    }

    if (!mailMessage) {
      const errorMessage = "該当するメール種別がないため、メール送信しませんでした";
      console.error(errorMessage);
      return Promise.resolve(errorMessage);
    }

    const config = functions.config();
    const options: Mail.Options = {
      from: `Cafe de Gamoyon<${config.gmail.email}>`,
      to: data.mail,
      bcc: config.gmail.email,
      subject: mailMessage.subject,
      text: mailMessage.text
    };

    console.log("予約者(種別): %s(%s)", data.reserver_name, data.type_name);
    console.log("メールアドレス: %s", data.mail);

    return GmailService.send(options);
});