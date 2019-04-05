export interface SignInData {
  email: string;
  password: string;
  rememberPassword: boolean;
}

export interface SignUpData extends SignInData {
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
  role: string;
  id: string;
}

export type AuthData = SignUpData | SignInData;
