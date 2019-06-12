/* eslint-disable class-methods-use-this */
import { UserInfo } from "../app/features/auth/models";

const REFRESH_TOKEN = "refreshToken";
const ACCESS_TOKEN = "accessToken";
const USER_INFO = "userInfo";

export class SecurityError extends Error {
  constructor(message: string) {
    super();
    this.message = message;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default class SecurityService {
  private accessToken: string | null = null;

  private refreshToken: string | null = null;

  private userInfo: UserInfo | null = null;

  constructor() {
    this.accessToken = localStorage.getItem(ACCESS_TOKEN);
    this.refreshToken = localStorage.getItem(REFRESH_TOKEN);
    this.userInfo = JSON.parse(localStorage.getItem(USER_INFO));
  }

  getAccessToken(): string {
    return this.accessToken;
  }

  getRefreshToken(): string {
    return this.refreshToken;
  }

  updateTokens(access: string, refresh: string): void {
    this.accessToken = access;
    this.refreshToken = refresh;
    localStorage.setItem(ACCESS_TOKEN, access);
    localStorage.setItem(REFRESH_TOKEN, refresh);
  }

  deleteTokens(): void {
    this.accessToken = null;
    this.refreshToken = null;
    localStorage.removeItem(REFRESH_TOKEN);
    localStorage.removeItem(ACCESS_TOKEN);
  }

  saveUserInfo(userInfo: UserInfo): void {
    this.userInfo = userInfo;
    localStorage.setItem(USER_INFO, JSON.stringify(userInfo));
  }

  getUserInfo(): UserInfo {
    return this.userInfo;
  }

  deleteUserInfo(): void {
    this.userInfo = null;
    localStorage.removeItem(USER_INFO);
  }

  reset(): void {
    this.deleteTokens();
    this.deleteUserInfo();
  }

  checkPermissions(permissions: Array<string>, user: UserInfo): boolean {
    const userRole = user && user.role;
    return permissions.some(role => role === userRole);
  }
}
