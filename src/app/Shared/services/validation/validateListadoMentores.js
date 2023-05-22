import {
  REGEX_PATTERN_NUMERO_DOCUMENTO,
  REGEX_PATTERN_SOLO_LETRAS,
} from "../../utils/regexPatterns";

export const validarListadoMentores = (datos) => {
  const errors = {};
  const { numeroDocumento, nombreMentor } = datos;

  //Validaciones para el numero de documento del emprendedor
  if (numeroDocumento) {
    const RegExp = REGEX_PATTERN_NUMERO_DOCUMENTO;
    if (!RegExp.test(numeroDocumento)) {
      errors.numeroDocumento = "Solo se permiten números entre 5 a 11 dígitos";
    }
  }

  //Validaciones para el nombre del emprendedor
  if (nombreMentor) {
    const RegExp = REGEX_PATTERN_SOLO_LETRAS;
    if (!RegExp.test(nombreMentor)) {
      errors.nombreMentor = "Solo se permiten letras";
    }
  }

  return errors;
};
