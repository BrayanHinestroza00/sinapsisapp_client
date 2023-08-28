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
  REGEX_PATTERN_SOLO_NUMEROS,
} from "../../utils/regexPatterns";

export const validacionesPrimeraAtencionUsuario = (datos, error) => {
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

export const validacionesPrimeraAtencionEmprendimiento = (datos, error) => {
  const errors = {};
  const {
    nombreEmprendimiento,
    descripcionProducto,
    necesidadesIdentificadas,
    descripcionClientes,
    estaConstituida,
    materiasPrimas,
    enfoqueSocial,
    sectorEmprendimiento,
    sitioWeb,
  } = datos;

  if (!nombreEmprendimiento) {
    errors.nombreEmprendimiento = "Campo Obligatorio";
  } else {
    if (nombreEmprendimiento.length > 1000) {
      errors.nombreEmprendimiento = "Solo se permiten 1000 caracteres";
    } else {
      const RegExp = REGEX_PATTERN_CARACTERES;
      if (!RegExp.test(nombreEmprendimiento)) {
        errors.nombreEmprendimiento = "Solo se permiten letras.";
      }
    }
  }

  if (!descripcionProducto) {
    errors.descripcionProducto = "Campo Obligatorio";
  } else {
    if (descripcionProducto.length > 4000) {
      errors.descripcionProducto = "Solo se permiten 4000 caracteres";
    }
  }

  if (!necesidadesIdentificadas) {
    errors.necesidadesIdentificadas = "Campo Obligatorio";
  } else {
    if (necesidadesIdentificadas.length > 4000) {
      errors.necesidadesIdentificadas = "Solo se permiten 4000 caracteres";
    }
  }

  if (!descripcionClientes) {
    errors.descripcionClientes = "Campo Obligatorio";
  } else {
    if (descripcionClientes.length > 4000) {
      errors.descripcionClientes = "Solo se permiten 4000 caracteres";
    }
  }

  if (materiasPrimas) {
    if (materiasPrimas.length > 1000) {
      errors.materiasPrimas = "Solo se permiten 1000 caracteres";
    }
  }

  if (enfoqueSocial) {
    if (enfoqueSocial.length > 500) {
      errors.enfoqueSocial = "Solo se permiten 500 caracteres";
    }
  }

  if (sectorEmprendimiento) {
    if (sectorEmprendimiento.length > 1000) {
      errors.sectorEmprendimiento = "Solo se permiten 1000 caracteres";
    }
  }

  if (sitioWeb) {
    if (sitioWeb.length > 2000) {
      errors.sitioWeb = "Solo se permiten 2000 caracteres";
    }
  }

  if (!estaConstituida) {
    errors.estaConstituida = "Campo Obligatorio";
  } else {
    if (estaConstituida == "S") {
      const {
        fechaConstitucion,
        nitEmpresa,
        nombreEmpresa,
        razonSocialEmpresa,
      } = datos;

      if (!fechaConstitucion) {
        errors.fechaConstitucion = "Campo Obligatorio";
      }

      if (!nitEmpresa) {
        errors.nitEmpresa = "Campo Obligatorio";
      } else {
        if (nitEmpresa.length > 50) {
          errors.nitEmpresa = "Solo se permiten 50 caracteres";
        }
      }

      if (!nombreEmpresa) {
        errors.nombreEmpresa = "Campo Obligatorio";
      } else {
        if (nombreEmpresa.length > 1000) {
          errors.nombreEmpresa = "Solo se permiten 1000 caracteres";
        }
      }

      if (!razonSocialEmpresa) {
        errors.razonSocialEmpresa = "Campo Obligatorio";
      } else {
        if (razonSocialEmpresa.length > 1000) {
          errors.razonSocialEmpresa = "Solo se permiten 1000 caracteres";
        }
      }
    }
  }

  if (error.logoEmpresa) {
    errors.logoEmpresa = error.logoEmpresa;
  }

  return errors;
};

export const validacionesPrimeraAtencionPA = (datos) => {
  const errors = {};
  const {
    nombreProducto,
    promedioVentas,
    evidenciaProducto,
    obtencionMateriasPrimas,
    equipoTrabajo,
    dedicacion,
    horasSemanales,
    motivacion,
    descubrioSinapsis,
  } = datos;

  if (!nombreProducto) {
    errors.nombreProducto = "Campo Obligatorio";
  } else {
    if (nombreProducto.length > 500) {
      errors.nombreProducto = "Solo se permiten 500 caracteres";
    }
  }

  if (promedioVentas) {
    const RegExp = REGEX_PATTERN_SOLO_NUMEROS;
    if (!RegExp.test(promedioVentas)) {
      errors.promedioVentas = "Solo se permiten números";
    } else if (promedioVentas.length > 20) {
      errors.promedioVentas = "Máximo 20 dígitos";
    }
  }

  if (evidenciaProducto) {
    if (evidenciaProducto.length > 1000) {
      errors.evidenciaProducto = "Solo se permiten 1000 caracteres";
    }
  }

  if (obtencionMateriasPrimas) {
    if (obtencionMateriasPrimas.length > 1000) {
      errors.obtencionMateriasPrimas = "Solo se permiten 1000 caracteres";
    }
  }

  if (!equipoTrabajo) {
    errors.equipoTrabajo = "Campo Obligatorio";
  } else {
    if (equipoTrabajo == "S") {
      const { cualEquipoTrabajo } = datos;

      if (!cualEquipoTrabajo) {
        errors.cualEquipoTrabajo = "Campo Obligatorio";
      } else {
        if (cualEquipoTrabajo.length > 500) {
          errors.cualEquipoTrabajo = "Solo se permiten 500 caracteres";
        }
      }
    }
  }

  if (!dedicacion) {
    errors.dedicacion = "Campo Obligatorio";
  } else {
    if (dedicacion.length > 1000) {
      errors.dedicacion = "Solo se permiten 1000 caracteres";
    }
  }

  if (!horasSemanales) {
    errors.horasSemanales = "Campo Obligatorio";
  } else {
    const RegExp = REGEX_PATTERN_SOLO_NUMEROS;
    if (!RegExp.test(horasSemanales)) {
      errors.horasSemanales = "Solo se permiten números";
    } else {
      if (horasSemanales > 168 || horasSemanales < 0) {
        errors.horasSemanales = "Solo se permite un número entre 0 y 168";
      }
    }
  }

  if (!motivacion) {
    errors.motivacion = "Campo Obligatorio";
  } else {
    if (motivacion.length > 1000) {
      errors.motivacion = "Solo se permiten 1000 caracteres";
    }
  }

  if (!descubrioSinapsis || descubrioSinapsis.length == 0) {
    errors.descubrioSinapsis = "Campo Obligatorio";
  } else {
    for (let i = 0; i < descubrioSinapsis.length; i++) {
      const metodoDescubrio = descubrioSinapsis[i];

      if (metodoDescubrio.value == "OTRO") {
        const { cualOtroDescubrioSinapsis } = datos;

        if (!cualOtroDescubrioSinapsis) {
          errors.cualOtroDescubrioSinapsis = "Campo Obligatorio";
        } else {
          if (cualOtroDescubrioSinapsis.length > 500) {
            errors.cualOtroDescubrioSinapsis =
              "Solo se permiten 500 caracteres";
          }
        }
        break;
      }
    }
  }

  return errors;
};

export const validacionesDiagnostico = (datos, error) => {
  const errors = {};
  const { fileDiagnostico } = datos;

  if (error.fileDiagnostico) {
    errors.fileDiagnostico = error.fileDiagnostico;
  } else if (!fileDiagnostico) {
    errors.fileDiagnostico = "Campo Obligatorio";
  }

  return errors;
};
