import { REGEX_PATTERN_CARACTERES } from "../../utils/regexPatterns";

export const validarRevisionConsultoria = (datos, tipo) => {
  const errors = {};
  const { comentariosConsultoria } = datos;

  if (tipo == "A") {
    if (comentariosConsultoria) {
      const RegExp = REGEX_PATTERN_CARACTERES;
      if (!RegExp.test(comentariosConsultoria)) {
        errors.comentariosConsultoria = "Solo se permiten letras";
      } else {
        if (comentariosConsultoria.length > 500) {
          errors.comentariosConsultoria = "Máximo 500 caracteres";
        }
      }
    }
  } else {
    if (!comentariosConsultoria) {
      errors.comentariosConsultoria = "Campo Obligatorio";
    } else {
      const RegExp = REGEX_PATTERN_CARACTERES;
      if (!RegExp.test(comentariosConsultoria)) {
        errors.comentariosConsultoria = "Solo se permiten letras";
      } else {
        if (comentariosConsultoria.length > 500) {
          errors.comentariosConsultoria = "Máximo 500 caracteres";
        }
      }
    }
  }

  return errors;
};

export const validarCreacionConsultoria = (datos, tipoUsuario) => {
  const errors = {};
  const {
    tituloConsultoria,
    tipoConsultoria,
    asuntoConsultoria,
    fechaConsultoria,
    horaFinalizacion,
    horaInicio,
    mentor,
  } = datos;

  if (!tituloConsultoria) {
    errors.tituloConsultoria = "Campo Obligatorio";
  } else {
    if (tituloConsultoria.length > 30) {
      errors.tituloConsultoria = "Solo se permiten 30 caracteres";
    }
  }

  if (!mentor && tipoUsuario == "ADMINISTRADOR") {
    errors.mentor = "Campo Obligatorio";
  }

  if (!tipoConsultoria && tipoUsuario == "ADMINISTRADOR") {
    errors.tipoConsultoria = "Campo Obligatorio";
  } else {
    if (tipoConsultoria == "E") {
      const { subActividadRuta } = datos;

      if (!subActividadRuta) {
        errors.subActividadRuta = "Campo Obligatorio";
      }
    }
  }

  if (!asuntoConsultoria) {
    errors.asuntoConsultoria = "Campo Obligatorio";
  } else {
    if (asuntoConsultoria.length > 100) {
      errors.asuntoConsultoria = "Solo se permiten 100 caracteres";
    }
  }

  if (!fechaConsultoria) {
    errors.fechaConsultoria = "Campo Obligatorio";
  }

  if (!horaFinalizacion) {
    errors.horaFinalizacion = "Campo Obligatorio";
  }

  if (!horaInicio) {
    errors.horaInicio = "Campo Obligatorio";
  }

  if (horaInicio && horaFinalizacion) {
    if (horaFinalizacion <= horaInicio) {
      errors.horaFinalizacion =
        "La hora de fin no puede ser anterior o igual a la hora de inicio";
    }
  }

  return errors;
};
