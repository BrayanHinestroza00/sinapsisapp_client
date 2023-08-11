import {
  REGEX_PATTERN_NUMERO_DOCUMENTO,
  REGEX_PATTERN_PASSWORD,
} from "../../utils/regexPatterns";

export const validacionesLogin = (datos) => {
  const errors = {};
  const { tipoDocumento, numeroDocumento, password } = datos;

  //Validaciones para el tipo de documento
  if (!tipoDocumento) {
    errors.tipoDocumento = "Campo obligatorio";
  }

  //Validaciones para el numero de documento
  if (!numeroDocumento) {
    errors.numeroDocumento = "Campo obligatorio";
  } else {
    const RegExp = REGEX_PATTERN_NUMERO_DOCUMENTO;
    if (!RegExp.test(numeroDocumento)) {
      errors.numeroDocumento = "Solo se permiten números entre 8 a 12 dígitos";
    }
  }

  //Validaciones para la contrasena
  if (!password) {
    errors.password = "Campo obligatorio";
  } else {
    const RegExp = REGEX_PATTERN_PASSWORD;
    if (!RegExp.test(password)) {
      errors.password =
        "La contraseña debe tener entre 8 y 15 caracteres, un símbolo, una mayúscula y al menos un dígito.";
    }
  }
  return errors;
};
