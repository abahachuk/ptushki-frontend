import { boolean, object, setLocale, string } from "yup";
import { labels } from "../../config/i18n/labels";

const { validation } = labels.form;

setLocale({
  mixed: {
    required: validation.required
  },
  string: {
    required: validation.required,
    email: validation.email
  }
});

// don't import schemas directly from yup. Instead, add proxying functions here.
// see https://github.com/jquense/yup/issues/293 for explanation

export const objectSchema = () => object();
export const stringSchema = () => string();
export const booleanSchema = () => boolean();
