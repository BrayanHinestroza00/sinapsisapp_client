import {
  REGEX_PATTERN_NUMERO_DOCUMENTO,
  REGEX_PATTERN_SOLO_LETRAS,
} from "../../utils/regexPatterns";

export const validarListadoSolicitudesPA = (datos) => {
  const errors = {};
  const { numeroDocumento, nombreEmprendedor, nombreEmprendimiento } = datos;

  //Validaciones para el numero de documento del emprendedor
  if (numeroDocumento) {
    const RegExp = REGEX_PATTERN_NUMERO_DOCUMENTO;
    if (!RegExp.test(numeroDocumento)) {
      errors.numeroDocumento = "Solo se permiten números entre 5 a 11 dígitos";
    }
  }

  //Validaciones para el nombre del emprendedor
  if (nombreEmprendedor) {
    const RegExp = REGEX_PATTERN_SOLO_LETRAS;
    if (!RegExp.test(nombreEmprendedor)) {
      errors.nombreEmprendedor = "Solo se permiten letras";
    }
  }

  //Validaciones para el nombre del emprendimiento
  if (nombreEmprendimiento) {
    const RegExp = REGEX_PATTERN_SOLO_LETRAS;
    if (!RegExp.test(nombreEmprendimiento)) {
      errors.nombreEmprendimiento = "Solo se permiten letras.";
    }
  }
  return errors;
};
