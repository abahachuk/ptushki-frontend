import SecurityService from "./SecurutyService";
import AjaxService from "./AjaxService";
import LocalizeService from "./LocalizeService";

const securityService = new SecurityService();
const ajaxService = new AjaxService();
const localizeService = new LocalizeService();

export { securityService, ajaxService, localizeService };
