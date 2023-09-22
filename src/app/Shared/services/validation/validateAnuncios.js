import { REGEX_PATTERN_CARACTERES } from "../../utils/regexPatterns";

export const validarCrearAnuncio = (datos, error) => {
  const errors = {};
  const { tituloAnuncio, descripcionAnuncio, permanente, fileAnuncio } = datos;

  //Validaciones para el titulo
  if (!tituloAnuncio) {
    errors.tituloAnuncio = "Campo Obligatorio";
  } else {
    if (tituloAnuncio.length > 100) {
      errors.tituloAnuncio = "Máximo 100 caracteres";
    }
  }

  //Validaciones para el titulo
  if (!descripcionAnuncio) {
    errors.descripcionAnuncio = "Campo Obligatorio";
  } else {
    if (descripcionAnuncio.length > 500) {
      errors.descripcionAnuncio = "Máximo 500 caracteres";
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
