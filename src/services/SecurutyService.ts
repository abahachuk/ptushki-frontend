import { Ability, AbilityBuilder } from "@casl/ability";
import { IAuthInfo, UserInfo } from "../app/features/auth/models";
import { UserRole, UserRoles } from "../config/permissions";

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

  public permissions: Ability = new Ability([]);

  constructor() {
    this.accessToken = localStorage.getItem(ACCESS_TOKEN);
    this.refreshToken = localStorage.getItem(REFRESH_TOKEN);
    this.userInfo = JSON.parse(localStorage.getItem(USER_INFO));
    this.updatePermissions();
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

  saveUserInfo(userInfo: UserInfo): UserInfo {
    this.userInfo = userInfo;
    localStorage.setItem(USER_INFO, JSON.stringify(userInfo));
    this.updatePermissions();
    return this.userInfo;
  }

  updatePermissions() {
    const role: UserRole =
      // @ts-ignore
      UserRoles[this.userInfo ? this.userInfo.role : "unauthorized"];
    // @ts-ignore
    this.permissions = AbilityBuilder.define(can => {
      const keys = Object.entries(role.permissions).forEach(
        ([scope, actions]) => {
          can(actions, scope);
        }
      );
    });
    return this.permissions;
  }

  getAuthInfo(): IAuthInfo {
    return { user: this.userInfo, permissions: this.permissions };
  }

  deleteUserInfo(): { user: UserInfo; permissions: Ability } {
    this.saveUserInfo(null as UserInfo);
    this.updatePermissions();
    return { user: this.userInfo, permissions: this.permissions };
  }

  reset(): IAuthInfo {
    this.deleteTokens();
    return this.deleteUserInfo();
  }
}
