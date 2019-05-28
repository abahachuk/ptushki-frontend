/**
 * Authorization/authentication
 */
const startURL = process.env.NODE_ENV === "production" ? "/api" : "";
const authRoute = "auth";
export const SING_UP_ENDPOINT = `${startURL}/${authRoute}/signup`;
export const SING_IN_ENDPOINT = `${startURL}/${authRoute}/login`;
export const RESTORE_PASSWORD_ENDPOINT = `${startURL}/${authRoute}/resetpassword`;
export const REFRESH_ENDPOINT = `${startURL}/${authRoute}/refresh`;

/**
 * Observations
 */
export const OBSERVATIONS_ENDPOINT = `${startURL}/observations`;
