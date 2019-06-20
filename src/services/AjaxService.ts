/* eslint-disable class-methods-use-this */
import { securityService } from ".";
import { AuthData, UserInfo } from "../app/features/auth/models";
import { REFRESH_ENDPOINT } from "../config/endpoints";
import { SecurityError } from "./SecurutyService";

export default class AjaxService {
  private refreshingCall: Promise<Response> | null = null;

  private pendingRequests: (() => void)[] = [];

  private async parseError(response: Response): Promise<string> {
    const { statusText } = response;
    let message;
    try {
      message = await response.json();
    } catch {
      return statusText;
    }

    return message ? message.error : statusText;
  }

  private async makeFetch(
    url: string,
    token: string | null,
    data?: any,
    method?: string
  ): Promise<any> {
    return fetch(url, {
      method: method || (data ? "POST" : "GET"),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify(data)
    });
  }

  private async refreshToken(): Promise<string> {
    if (!this.refreshingCall) {
      const refresh = securityService.getRefreshToken();

      if (!refresh) {
        throw new SecurityError("No refresh token provided");
      }

      this.refreshingCall = this.makeFetch(REFRESH_ENDPOINT, null, {
        refreshToken: refresh
      });
    } else {
      await new Promise(resolve => {
        this.pendingRequests.push(resolve);
      });
      return securityService.getAccessToken();
    }

    const response = await this.refreshingCall;
    this.refreshingCall = null;

    if (!response.ok) {
      this.pendingRequests = [];
      throw new SecurityError("Unable to refresh token");
    }

    const { token, refreshToken } = await response.json();
    securityService.updateTokens(token, refreshToken);

    this.pendingRequests.forEach((resolve: any) => resolve());
    this.pendingRequests = [];

    return token;
  }

  async makeCall<TResponse>(
    url: string,
    data?: Object,
    method?: string
  ): Promise<TResponse> {
    let token = securityService.getAccessToken();
    let response = await this.makeFetch(url, token, data, method);

    if (response.status === 401) {
      token = await this.refreshToken();
      response = await this.makeFetch(url, token, data);
    } else if (!response.ok) {
      const message = await this.parseError(response);
      throw new Error(message);
    }

    return response.json();
  }

  async makeAuthCall(url: string, data: AuthData): Promise<UserInfo> {
    const response = await this.makeFetch(url, null, data);

    if (!response.ok) {
      const message = await this.parseError(response);
      throw new Error(message);
    }

    const { user, token, refreshToken } = await response.json();
    securityService.updateTokens(token, refreshToken);
    const permissions = securityService.saveUserInfo(user);

    return { ...user, permissions };
  }
}
