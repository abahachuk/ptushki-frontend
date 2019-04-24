/* eslint-disable class-methods-use-this */
import { securityService } from ".";
import { AuthData, UserInfo } from "../app/features/auth/models";
import { signOut } from "../store/actions/authActions";
import { REFRESH_ENDPOINT } from "../config/endpoints";

export default class AjaxService {
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
    data?: any
  ): Promise<any> {
    return fetch(url, {
      method: data ? "POST" : "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify(data)
    });
  }

  private async refreshToken(): Promise<string> {
    const refreshToken = securityService.getRefreshToken();

    if (!refreshToken) {
      signOut();
      throw new Error("No refresh token provided");
    }

    const response = await this.makeFetch(REFRESH_ENDPOINT, null, {
      refreshToken
    });

    if (!response.ok) {
      signOut();
      throw new Error("Unable to refresh token");
    }

    const { access, refresh } = await response.json();
    securityService.updateTokens(access, refresh);

    return access;
  }

  async makeCall<TResponse>(url: string, data?: Object): Promise<TResponse> {
    let token = securityService.getAccessToken();
    let response = await this.makeFetch(url, token, data);

    if (response.status === 403) {
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
    securityService.saveTokens(token, refreshToken, data.rememberPassword);
    securityService.saveUserInfo(user);

    return user;
  }
}
