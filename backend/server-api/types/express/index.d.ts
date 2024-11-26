import { IUser } from "../../server-api/models/user"; // Percorso corretto per il tuo modello utente.

declare global {
  namespace Express {
    export interface Request {
      user?: IUser; // Estende il tipo Request di Express con `user`.
    }
  }
}
