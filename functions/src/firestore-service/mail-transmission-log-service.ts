import * as admin from "firebase-admin";
import { MailTransmissionLog } from "../entity/mail-transmission-log";

/**
 * Mail transmission log CRUD service
 */
export class MailTransmissionLogService {
    private static readonly COLLETION_NAME = "mail_transmission_logs";

    static add(payload: MailTransmissionLog) {
        const doc = admin.firestore().collection(this.COLLETION_NAME).doc();

        return doc.create(payload);
    }
}