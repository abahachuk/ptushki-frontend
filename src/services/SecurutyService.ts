import { UserInfo } from "../app/features/auth/models";

const REFRESH_TOKEN = "refreshToken";
const ACCESS_TOKEN = "accessToken";
const USER_INFO = "userInfo";

export default class SecurityService {
  private storage: Storage | null = null;

  private accessToken: string | null = null;

  private refreshToken: string | null = null;

  getAccessToken(): string {
    return this.accessToken;
  }

  getRefreshToken(): string {
    return this.refreshToken;
  }

  updateTokens(access: string, refresh: string): void {
    this.accessToken = access;
    this.refreshToken = refresh;
    this.storage.setItem(ACCESS_TOKEN, access);
    this.storage.setItem(REFRESH_TOKEN, refresh);
  }

  saveTokens(access: string, refresh: string, remember: boolean): void {
    this.storage = remember ? localStorage : sessionStorage;
    this.updateTokens(access, refresh);
  }

  deleteTokens(): void {
    this.accessToken = null;
    this.refreshToken = null;
    this.storage.removeItem(REFRESH_TOKEN);
    this.storage.removeItem(ACCESS_TOKEN);
  }

  saveUserInfo(userInfo: UserInfo): void {
    this.storage.setItem(USER_INFO, JSON.stringify(userInfo));
  }

  deleteUserInfo(): void {
    this.storage.removeItem(USER_INFO);
  }

  deleteSensitiveData() {
    this.deleteTokens();
    this.deleteUserInfo();
  }

  reset(): void {
    this.storage = localStorage;
    this.deleteSensitiveData();

    this.storage = sessionStorage;
    this.deleteSensitiveData();

    this.storage = null;
  }
}
