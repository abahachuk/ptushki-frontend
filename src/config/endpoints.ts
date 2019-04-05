const root = "http://localhost:3001";

/**
 * Authorization/authentication
 */
const authRoute = "auth";
export const SING_UP_ENDPOINT = `${root}/${authRoute}/signup`;
export const SING_IN_ENDPOINT = `${root}/${authRoute}/login`;
export const RESTORE_PASSWORD_ENDPOINT = `${root}/${authRoute}/resetpassword`;
