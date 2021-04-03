import * as functions from "firebase-functions";
import * as nodemailer from "nodemailer";
import * as Mail from "nodemailer/lib/mailer";
import { MailMessage } from "../entity/mail-message";

export class GmailService {
  static getMailOptions(destination: string, payload: MailMessage): Mail.Options {
    const config = functions.config();
    const options: Mail.Options = {
      from: `Cafe de Gamoyon<${config.gmail.email}>`,
      to: destination,
      bcc: config.gmail.email,
      subject: payload.subject,
      text: payload.text
    };

    return options;
  }

  static send(payload: Mail.Options): Promise<any> {
    const config = functions.config();
    const mailTransport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: config.gmail.email,
        pass: config.gmail.password
      }
    });

    return mailTransport
      .sendMail(payload)
      .then(response => console.log(response))
      .catch(err => console.error(err));
  }
}
