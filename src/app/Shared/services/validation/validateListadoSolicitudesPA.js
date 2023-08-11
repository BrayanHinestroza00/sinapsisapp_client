import {
  REGEX_PATTERN_CARACTERES,
  REGEX_PATTERN_NUMERO_DOCUMENTO,
} from "../../utils/regexPatterns";

export const validarListadoSolicitudesPA = (datos) => {
  const errors = {};
  const { numeroDocumento, nombreEmprendedor, nombreEmprendimiento } = datos;

  //Validaciones para el numero de documento del emprendedor
  if (numeroDocumento) {
    const RegExp = REGEX_PATTERN_NUMERO_DOCUMENTO;
    if (!RegExp.test(numeroDocumento)) {
      errors.numeroDocumento = "Solo se permiten números entre 8 a 12 dígitos";
    }
  }

  //Validaciones para el nombre del emprendedor
  if (nombreEmprendedor) {
    if (nombreEmprendedor.length > 100) {
      errors.nombreEmprendedor = "Solo se permiten 100 caracteres";
    } else {
      const RegExp = REGEX_PATTERN_CARACTERES;
      if (!RegExp.test(nombreEmprendedor)) {
        errors.nombreEmprendedor = "Solo se permiten letras";
      }
    }
  }

  //Validaciones para el nombre del emprendimiento
  if (nombreEmprendimiento) {
    if (nombreEmprendimiento.length > 100) {
      errors.nombreEmprendimiento = "Solo se permiten 100 caracteres";
    } else {
      const RegExp = REGEX_PATTERN_CARACTERES;
      if (!RegExp.test(nombreEmprendimiento)) {
        errors.nombreEmprendimiento = "Solo se permiten letras.";
      }
    }
  }
  return errors;
};
