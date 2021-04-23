import firebase from "firebase";

/**
 * Paging options entity
 */
export interface Page {
  limit?: number;
  start?: firebase.firestore.DocumentSnapshot | null;
  end?: firebase.firestore.DocumentSnapshot | null;
}
