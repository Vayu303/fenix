import { Request } from "express";
import { IUser } from "../models/user";

export interface AuthenticatedRequest extends Request {
  user?: IUser; // Aggiungi il tipo IUser dalla tua definizione di User
}
