import { REGEX_PATTERN_CARATERETES } from "../../utils/regexPatterns";

export const validarCrearAnuncio = (datos, error) => {
  const errors = {};
  const { tituloAnuncio, descripcionAnuncio, permanente, fileAnuncio } = datos;

  //Validaciones para el titulo
  if (!tituloAnuncio) {
    errors.tituloAnuncio = "Campo Obligatorio";
  } else {
    const RegExp = REGEX_PATTERN_CARATERETES;
    if (!RegExp.test(tituloAnuncio)) {
      errors.tituloAnuncio = "Maximo 200 caracteres";
    }
  }

  //Validaciones para el titulo
  if (!descripcionAnuncio) {
    errors.descripcionAnuncio = "Campo Obligatorio";
  } else {
    const RegExp = REGEX_PATTERN_CARATERETES;
    if (!RegExp.test(descripcionAnuncio)) {
      errors.descripcionAnuncio = "Maximo 200 caracteres";
    }
  }

  //Validaciones para el mentor principal del emprendedor
  if (!permanente) {
    errors.permanente = "Campo Obligatorio";
  } else {
    if (permanente == 0) {
      const { fechaHasta } = datos;
      if (!fechaHasta) {
        errors.permanente = "Campo Obligatorio";
      }
    }
  }

  //Validaciones para el flyer
  if (error.fileAnuncio) {
    errors.fileAnuncio = error.fileAnuncio;
  } else if (!fileAnuncio) {
    errors.fileAnuncio = "Campo Obligatorio";
  }

  return errors;
};
