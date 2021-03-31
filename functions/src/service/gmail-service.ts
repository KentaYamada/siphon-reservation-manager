import * as functions from "firebase-functions";
import * as nodemailer from "nodemailer";
import * as Mail from "nodemailer/lib/mailer";

export class GmailService {
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
