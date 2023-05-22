import { REGEX_PATTERN_PASSWORD } from "../../utils/regexPatterns";

export const validarActualizacionContrasena = (datos) => {
  const errors = {};
  const { oldPassword, newPassword, newPasswordConfirm } = datos;

  //Validaciones para el oldPassword
  if (!oldPassword || !oldPassword.trim().length > 0) {
    errors.oldPassword = "Campo obligatorio";
  } else {
    const RegExp = REGEX_PATTERN_PASSWORD;
    if (!RegExp.test(oldPassword)) {
      errors.oldPassword =
        "La contraseña debe tener entre 4 y 12 caracteres y al menos un dígito.";
    }
  }

  //Validaciones para el newPassword
  if (!newPassword || !newPassword.trim().length > 0) {
    errors.newPassword = "Campo obligatorio";
  } else {
    const RegExp = REGEX_PATTERN_PASSWORD;
    if (!RegExp.test(newPassword)) {
      errors.newPassword =
        "La contraseña debe tener entre 4 y 12 caracteres y al menos un dígito.";
    }
  }

  //Validaciones para el newPasswordConfirm
  if (!newPasswordConfirm || !newPasswordConfirm.trim().length > 0) {
    errors.newPasswordConfirm = "Campo obligatorio";
  } else {
    const RegExp = REGEX_PATTERN_PASSWORD;
    if (!RegExp.test(newPasswordConfirm)) {
      errors.newPasswordConfirm =
        "La contraseña debe tener entre 4 y 12 caracteres y al menos un dígito.";
    }
  }

  //Validaciones para el diferencia de password
  if (newPassword && newPasswordConfirm) {
    if (newPassword !== newPasswordConfirm) {
      errors.newPassword = "Las contraseñas deben ser iguales";
      errors.newPasswordConfirm = "Las contraseñas deben ser iguales";
    }
  }

  return errors;
};
