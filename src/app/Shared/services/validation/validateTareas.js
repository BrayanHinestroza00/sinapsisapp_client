import {
  REGEX_PATTERN_CARACTERES,
  REGEX_PATTERN_SOLO_LETRAS,
} from "../../utils/regexPatterns";

export const validarCreacionTarea = (datos, error) => {
  const errors = {};
  const { fileTarea, descripcionTarea, fechaEntrega, nombreTarea } = datos;
  if (!nombreTarea) {
    errors.nombreTarea = "Campo Obligatorio";
  } else {
    if (nombreTarea.length > 30) {
      errors.nombreTarea = "Solo se permiten 30 caracteres";
    }
  }

  if (!descripcionTarea) {
    errors.descripcionTarea = "Campo Obligatorio";
  } else {
    if (descripcionTarea.length > 500) {
      errors.descripcionTarea = "Solo se permiten 500 caracteres";
    }
  }

  // if (!fechaEntrega) {
  //   errors.fechaEntrega = "Campo Obligatorio";
  // } else {
  //   if (new Date(fechaEntrega) < new Date()) {
  //     errors.fechaEntrega =
  //       "La fecha límite de entrega NO puede ser menor de HOY";
  //   }
  // }

  if (error.fileTarea) {
    errors.fileTarea = error.fileTarea;
  } else if (!fileTarea) {
    errors.fileTarea = "Campo Obligatorio";
  } else {
    if (fileTarea.length > 1) {
      errors.fileTarea = "Solo se permite subir 1 archivo";
    }
  }
  return errors;
};

export const validarEntregaTarea = (datos, error) => {
  const errors = {};
  const { files, comentarioEmprendedor } = datos;

  if (comentarioEmprendedor) {
    const RegExp = REGEX_PATTERN_CARACTERES;
    if (!RegExp.test(comentarioEmprendedor)) {
      errors.comentarioEmprendedor = "Solo se permiten letras";
    } else {
      if (comentarioEmprendedor.length > 500) {
        errors.comentarioEmprendedor = "Solo se permiten 500 caracteres";
      }
    }
  }

  if (error.files) {
    errors.files = error.files;
  } else if (!files) {
    errors.files = "Campo Obligatorio";
  } else if (files.length > 1) {
    errors.files = "Solo se permite subir 1 archivo";
  }

  return errors;
};

export const validarCalificacionTarea = (datos) => {
  const errors = {};
  const { calificacionEntrega, comentariosEntrega } = datos;

  if (comentariosEntrega) {
    const RegExp = REGEX_PATTERN_SOLO_LETRAS;
    if (!RegExp.test(comentariosEntrega)) {
      errors.comentariosEntrega = "Solo se permiten letras";
    } else {
      if (comentariosEntrega.length > 500) {
        errors.comentariosEntrega = "Solo se permiten 500 caracteres";
      }
    }
  }

  if (!calificacionEntrega) {
    errors.calificacionEntrega = "Campo Obligatorio";
  }

  return errors;
};
