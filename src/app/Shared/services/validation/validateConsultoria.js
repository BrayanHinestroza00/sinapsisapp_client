import { REGEX_PATTERN_CARATERETES } from "../../utils/regexPatterns";

export const validarRevisionConsultoria = (datos, tipo) => {
  const errors = {};
  const { comentariosConsultoria } = datos;

  if (tipo == "A") {
    if (comentariosConsultoria) {
      const RegExp = REGEX_PATTERN_CARATERETES;
      if (!RegExp.test(comentariosConsultoria)) {
        errors.comentariosConsultoria = "Máximo 200 caracteres";
      }
    }
  } else {
    if (!comentariosConsultoria) {
      errors.comentariosConsultoria = "Campo Obligatorio";
    }
  }

  return errors;
};

export const validarCreacionConsultoria = (datos) => {
  const errors = {};
  const {
    tituloConsultoria,
    tipoConsultoria,
    asuntoConsultoria,
    fechaConsultoria,
    horaFinalizacion,
    horaInicio,
  } = datos;

  if (!tituloConsultoria) {
    errors.tituloConsultoria = "Campo Obligatorio";
  }

  if (!tipoConsultoria) {
    errors.tipoConsultoria = "Campo Obligatorio";
  } else {
    if (tipoConsultoria == "E") {
      const { subActividadRuta, mentor } = datos;

      if (!subActividadRuta) {
        errors.subActividadRuta = "Campo Obligatorio";
      }

      if (!mentor) {
        errors.mentor = "Campo Obligatorio";
      }
    }
  }

  if (!asuntoConsultoria) {
    errors.asuntoConsultoria = "Campo Obligatorio";
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
