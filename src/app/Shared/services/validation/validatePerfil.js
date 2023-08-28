import {
  T_SINAPSIS_NIVEL_ACADEMICO_PREGRADO,
  T_SINAPSIS_PROGRAMAS_OTRO,
  T_SINAPSIS_TIPOS_CONTACTO_COLABORADOR,
  T_SINAPSIS_TIPOS_CONTACTO_EGRESADO,
  T_SINAPSIS_TIPOS_CONTACTO_ESTUDIANTE,
  T_SINAPSIS_TIPOS_CONTACTO_EXTERNO,
} from "../../utils/constants";
import {
  REGEX_PATTERN_CARACTERES,
  REGEX_PATTERN_CORREO_ELECTRONICO,
  REGEX_PATTERN_NUMERO_TELEFONO,
} from "../../utils/regexPatterns";

export const validacionesEditarPerfil = (datos, error) => {
  const errors = {};
  const {
    fechaNacimiento,
    genero,
    correoPersonal,
    celular,
    departamento,
    municipioId,
    direccion,
    vinculoConU,
  } = datos;

  if (!fechaNacimiento) {
    errors.fechaNacimiento = "Campo Obligatorio";
  }
  if (!genero) {
    errors.genero = "Campo Obligatorio";
  }
  if (!correoPersonal) {
    errors.correoPersonal = "Campo obligatorio";
  } else {
    // eslint-disable-next-line
    const RegExp = REGEX_PATTERN_CORREO_ELECTRONICO;
    if (!RegExp.test(correoPersonal)) {
      errors.correo = "El correo no es válido";
    }
  }
  if (celular) {
    const RegExp = REGEX_PATTERN_NUMERO_TELEFONO;
    if (!RegExp.test(celular)) {
      errors.celular = "Solo se permiten números y máximo 10 dígitos";
    }
  }
  if (!departamento) {
    errors.departamento = "Campo Obligatorio";
  }
  if (!municipioId && !datos?.municipioId) {
    errors.municipioId = "Campo Obligatorio";
  }
  if (!direccion) {
    errors.direccion = "Campo Obligatorio";
  } else {
    if (direccion.length > 500) {
      errors.direccion = "Máximo 500 caracteres";
    }
  }
  if (!vinculoConU) {
    errors.vinculoConU = "Campo Obligatorio";
  } else {
    if (vinculoConU == T_SINAPSIS_TIPOS_CONTACTO_ESTUDIANTE) {
      const { codigoEstudiantil, tipoEstudiante, programaAcademico } = datos;
      if (!codigoEstudiantil) {
        errors.codigoEstudiantil = "Campo Obligatorio";
      } else {
        if (codigoEstudiantil.length != 7) {
          errors.codigoEstudiantil =
            "El codigo estudiantil debe ser de 7 dígitos";
        }
      }
      if (!tipoEstudiante) {
        errors.tipoEstudiante = "Campo Obligatorio";
      } else {
        const { modTrabajoGrado } = datos;
        if (
          tipoEstudiante === T_SINAPSIS_NIVEL_ACADEMICO_PREGRADO &&
          modTrabajoGrado == null
        ) {
          errors.modTrabajoGrado = "Campo Obligatorio";
        }
      }
      if (programaAcademico == null) {
        errors.programaAcademico = "Campo Obligatorio";
      } else {
        const { cualOtroProgramaAcademico } = datos;
        if (programaAcademico == T_SINAPSIS_PROGRAMAS_OTRO) {
          if (cualOtroProgramaAcademico == null) {
            errors.cualOtroProgramaAcademico = "Campo Obligatorio";
          } else {
            if (cualOtroProgramaAcademico.length > 20) {
              errors.cualOtroProgramaAcademico = "Máximo 20 caracteres";
            }
          }
        }
      }
    } else if (vinculoConU == T_SINAPSIS_TIPOS_CONTACTO_EGRESADO) {
      const { profesionEgresado, tipoEstudianteEgresado } = datos;
      if (!profesionEgresado) {
        errors.profesionEgresado = "Campo Obligatorio";
      }
      if (!tipoEstudianteEgresado) {
        errors.tipoEstudianteEgresado = "Campo Obligatorio";
      }
    } else if (vinculoConU == T_SINAPSIS_TIPOS_CONTACTO_COLABORADOR) {
      const { cargoColaborador, dependenciaColaborador } = datos;
      if (!cargoColaborador) {
        errors.cargoColaborador = "Campo Obligatorio";
      } else {
        if (cargoColaborador.length > 500) {
          errors.cargoColaborador = "Máximo 500 caracteres";
        }
      }
      if (!dependenciaColaborador) {
        errors.dependenciaColaborador = "Campo Obligatorio";
      } else {
        if (dependenciaColaborador.length > 500) {
          errors.dependenciaColaborador = "Máximo 500 caracteres";
        }
      }
    }
  }

  if (error.fotoPerfil) {
    errors.fotoPerfil = error.fotoPerfil;
  }

  return errors;
};

export const validacionesEditarPerfilUsuario = (datos, error) => {
  const errors = {};
  const { correoPersonal, telefonoContacto, dependencia, facultad, cargo } =
    datos;

  if (correoPersonal) {
    // eslint-disable-next-line
    const RegExp = REGEX_PATTERN_CORREO_ELECTRONICO;
    if (!RegExp.test(correoPersonal)) {
      errors.correoPersonal = "El correo personal no es válido";
    }
  }

  if (telefonoContacto) {
    const RegExp = REGEX_PATTERN_NUMERO_TELEFONO;
    if (!RegExp.test(telefonoContacto)) {
      errors.telefonoContacto = "Solo se permiten números y máximo 10 dígitos";
    }
  }

  if (dependencia) {
    if (dependencia.length > 500) {
      errors.dependencia = "Máximo 500 caracteres";
    }
  }

  if (facultad) {
    if (facultad.length > 500) {
      errors.facultad = "Máximo 500 caracteres";
    }
  }

  if (!cargo) {
    errors.cargo = "Campo Obligatorio";
  } else {
    if (cargo.length > 500) {
      errors.cargo = "Máximo 500 caracteres";
    }
  }

  if (error.fotoPerfil) {
    errors.fotoPerfil = error.fotoPerfil;
  }

  return errors;
};
