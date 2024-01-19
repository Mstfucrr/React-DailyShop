import { IUser } from "@/services/auth/types";

export interface IinitialState {
  isAuthorized: boolean;
  isAdminAuthorized: boolean;
  auth: IUser;
  token: string;
}
