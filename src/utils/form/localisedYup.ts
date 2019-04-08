import { boolean, object, setLocale, string } from "yup";

setLocale({
  mixed: {
    required: "Обязательное поле"
  },
  string: {
    required: "Обязательное поле",
    email: "Некоррректный email"
  }
});

// don't import schemas directly from yup. Instead, add proxying functions here.
// see https://github.com/jquense/yup/issues/293 for explanation

export const objectSchema = () => object();
export const stringSchema = () => string();
export const booleanSchema = () => boolean();
