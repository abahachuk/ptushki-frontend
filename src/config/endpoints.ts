/**
 * Authorization/authentication
 */
const startURL = process.env.API_DOMAIN || "http://localhost:3001";
const authRoute = "auth";
const authEndpoint = `${startURL}/${authRoute}`;
export const SING_UP_ENDPOINT = `${authEndpoint}/signup`;
export const SING_IN_ENDPOINT = `${authEndpoint}/login`;
export const RESTORE_PASSWORD_ENDPOINT = `${authEndpoint}/resetpassword`;
export const REFRESH_ENDPOINT = `${authEndpoint}/refresh`;
export const LOGOUT_ENDPOINT = `${authEndpoint}/logout`;

/**
 * Initial data
 */
export const INITIAL_DATA_ENDPOINT = `${startURL}/initial-data`;

/**
 * Observations
 */
const observationRoute = "observations";
const exportRoute = "export";
const importRoute = "import";
export const OBSERVATIONS_ENDPOINT = `${startURL}/${observationRoute}`;
export const OBSERVATIONS_FILTERS_ENDPOINT = `${OBSERVATIONS_ENDPOINT}/aggregations`;
export const OBSERVATIONS_DOWNLOAD_EXCEL_TEMPLATE = `${OBSERVATIONS_ENDPOINT}/${exportRoute}/template`;
export const OBSERVATIONS_EXPORT_EXCEL = `${OBSERVATIONS_ENDPOINT}/${exportRoute}/xls`;
export const OBSERVATIONS_VALIDATE_IMPORT = `${OBSERVATIONS_ENDPOINT}/${importRoute}/validate-xls`;
export const OBSERVATIONS_IMPORT = `${OBSERVATIONS_ENDPOINT}/${importRoute}/xls`;
export const OBSERVATIONS_SET_VERIFICATION = `${OBSERVATIONS_ENDPOINT}/set-verification`;

/**
 * Birds
 */
const birdRoute = "rings-by";
export const BIRDS_ENDPOINT = `${startURL}/${birdRoute}`;
export const BIRDS_FILTERS_ENDPOINT = `${BIRDS_ENDPOINT}/aggregations`;
