import * as functions from "firebase-functions";
import * as nodemailer from "nodemailer";
import * as corsLib from "cors";

const cors = corsLib({ origin: true });
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

exports.sendMail = functions.https.onRequest((request, response) => {
  return cors(request, response, () => {
    const message = {
      from: `Cafe de Gamoyon <${config.gmail.email}>`,
      to: request.body.data.destination,
      subject: request.body.data.subject,
      text: request.body.data.message
    };

    console.log(request.body);
    console.log(message);

    return mailTransport
      .sendMail(message)
      .then(res => console.log(res))
      .catch(error => console.error(error));
  });
});
