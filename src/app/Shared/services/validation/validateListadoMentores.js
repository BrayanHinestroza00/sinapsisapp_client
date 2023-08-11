import {
  REGEX_PATTERN_CARACTERES,
  REGEX_PATTERN_NUMERO_DOCUMENTO,
} from "../../utils/regexPatterns";

export const validarListadoMentores = (datos) => {
  const errors = {};
  const { numeroDocumento, nombreMentor } = datos;

  //Validaciones para el numero de documento del mentor
  if (numeroDocumento) {
    const RegExp = REGEX_PATTERN_NUMERO_DOCUMENTO;
    if (!RegExp.test(numeroDocumento)) {
      errors.numeroDocumento = "Solo se permiten números entre 8 a 12 dígitos";
    }
  }

  //Validaciones para el nombre del mentor
  if (nombreMentor) {
    if (nombreMentor.length > 100) {
      errors.nombreMentor = "Solo se permiten 100 caracteres";
    } else {
      const RegExp = REGEX_PATTERN_CARACTERES;
      if (!RegExp.test(nombreMentor)) {
        errors.nombreMentor = "Solo se permiten letras";
      }
    }
  }

  return errors;
};
