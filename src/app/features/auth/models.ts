import { Ability } from "@casl/ability";

export interface SignInData {
  email: string;
  password: string;
  rememberPassword: boolean;
}

export interface SignUpData extends SignInData {
  phone: string;
  firstName: string;
  lastName: string;
}

export interface ResetPasswordData {
  email: string;
}

export interface UserInfo {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: string;
  id: string;
}

export interface IAuthInfo {
  user: UserInfo;
  permissions: Ability;
}

export type AuthData = SignUpData | SignInData;
