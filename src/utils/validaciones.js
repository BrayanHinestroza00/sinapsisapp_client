import {
  T_SINAPSIS_NIVEL_ACADEMICO_PREGRADO,
  T_SINAPSIS_TIPOS_CONTACTO_COLABORADOR,
  T_SINAPSIS_TIPOS_CONTACTO_EGRESADO,
  T_SINAPSIS_TIPOS_CONTACTO_ESTUDIANTE,
  T_SINAPSIS_TIPOS_CONTACTO_EXTERNO,
} from "./constants";
import {
  REGEX_PATTERN_CARATERETES,
  REGEX_PATTERN_CORREO_ELECTRONICO,
  REGEX_PATTERN_NUMERO_DOCUMENTO,
  REGEX_PATTERN_NUMERO_TELEFONO,
  REGEX_PATTERN_PASSWORD,
  REGEX_PATTERN_SOLO_LETRAS,
  REGEX_PATTERN_SOLO_NUMEROS,
} from "./regexPatterns";

/**
 * Validaciones de autenticación
 */
export const validacionesLogin = (datos) => {
  const errors = {};
  const { tipoDocumento, numeroDocumento, password } = datos;

  //Validaciones para el tipo de documento
  if (!tipoDocumento) {
    errors.tipoDocumento = "Campo obligatorio";
  }

  //Validaciones para el numero de documento
  if (!numeroDocumento) {
    errors.numeroDocumento = "Campo obligatorio";
  } else {
    const RegExp = REGEX_PATTERN_NUMERO_DOCUMENTO;
    if (!RegExp.test(numeroDocumento)) {
      errors.numeroDocumento = "Solo se permiten números entre 5 a 11 dígitos";
    }
  }

  //Validaciones para la contrasena
  if (!password) {
    errors.password = "Campo obligatorio";
  } else {
    const RegExp = REGEX_PATTERN_PASSWORD;
    if (!RegExp.test(password)) {
      errors.password =
        "La contraseña debe tener entre 4 y 12 caracteres y al menos un dígito.";
    }
  }
  return errors;
};

export const validacionesSignUp = (datos) => {
  const errors = {};
  const {
    nombres,
    apellidos,
    tipoDocumento,
    numeroDocumento,
    correo,
    contrasena,
    confirmContrasena,
    aceptoTratamientoDatos,
  } = datos;

  //Validaciones para el tipo de documento
  if (!tipoDocumento) {
    errors.tipoDocumento = "Campo obligatorio";
  }

  //Validaciones para el tratamiento de datos
  if (!aceptoTratamientoDatos) {
    errors.aceptoTratamientoDatos = "Debes aceptar los términos";
  }

  //Validaciones para el numero de documento
  if (!numeroDocumento) {
    errors.numeroDocumento = "Campo obligatorio";
  } else {
    const RegExp = REGEX_PATTERN_NUMERO_DOCUMENTO;
    if (!RegExp.test(numeroDocumento)) {
      errors.numeroDocumento = "Solo se permiten números entre 5 a 11 dígitos";
    }
  }

  //Validaciones para el nombre
  if (!nombres) {
    errors.nombres = "Campo obligatorio";
  } else {
    const RegExp = /^[A-Za-z ]{1,255}$/;
    if (!RegExp.test(nombres)) {
      errors.nombres = "Solo se permiten letras";
    } else {
      const RegExp = /^[A-Za-z ]{1,50}$/;
      if (!RegExp.test(nombres)) {
        errors.nombres = "Mínimo 1 y máximo 50 caracteres.";
      }
    }
  }
  //Validaciones para apellidos
  if (!apellidos) {
    errors.apellidos = "Campo obligatorio";
  } else {
    const RegExp = /^[A-Za-z ]{1,255}$/;
    if (!RegExp.test(apellidos)) {
      errors.apellidos = "Solo se permiten letras";
    } else {
      const RegExp = /^[A-Za-z ]{1,50}$/;
      if (!RegExp.test(apellidos)) {
        errors.apellidos = "Mínimo 1 y máximo 50 caracteres.";
      }
    }
  }

  //Validaciones para el correo
  if (!correo) {
    errors.correo = "Campo obligatorio";
  } else {
    // eslint-disable-next-line
    const RegExp = REGEX_PATTERN_CORREO_ELECTRONICO;
    if (!RegExp.test(correo)) {
      errors.correo = "El correo no es válido";
    }
  }

  //Validaciones para la contrasena
  if (!contrasena) {
    errors.contrasena = "Campo obligatorio";
  } else {
    const RegExp = REGEX_PATTERN_PASSWORD;
    if (!RegExp.test(contrasena)) {
      errors.contrasena =
        "La contraseña debe tener entre 4 y 12 caracteres y al menos un dígito.";
    }
  }

  if (!confirmContrasena) {
    errors.confirmContrasena = "Campo obligatorio";
  } else {
    const RegExp = REGEX_PATTERN_PASSWORD;
    if (!RegExp.test(confirmContrasena)) {
      errors.confirmContrasena =
        "La contraseña debe tener entre 4 y 12 caracteres y al menos un dígito.";
    }
  }

  if (confirmContrasena && contrasena) {
    if (contrasena !== confirmContrasena) {
      errors.contrasena = "Las contraseñas deben ser iguales";
      errors.confirmContrasena = "Las contraseñas deben ser iguales";
    }
  }
  return errors;
};

export const validacionesSignUpComunidadUAO = (datos) => {
  const errors = {};
  const {
    usuario,
    tipoDocumento,
    numeroDocumento,
    contrasena,
    confirmContrasena,
  } = datos;
  //Validaciones para el tipo de documento
  if (!tipoDocumento || tipoDocumento == "-1") {
    errors.tipoDocumento = "Campo obligatorio";
  }

  //Validaciones para el numero de documento
  if (!numeroDocumento) {
    errors.numeroDocumento = "Campo obligatorio";
  } else {
    const RegExp = REGEX_PATTERN_NUMERO_DOCUMENTO;
    if (!RegExp.test(numeroDocumento)) {
      errors.numeroDocumento = "Solo se permiten números entre 5 a 11 dígitos";
    }
  }

  //Validaciones para el usuario
  if (!usuario) {
    errors.usuario = "Campo obligatorio";
  } else {
    const RegExp = /^[A-Za-z ]{1,255}$/;
    if (!RegExp.test(usuario)) {
      errors.usuario = "Solo se permiten letras";
    } else {
      const RegExp = /^[A-Za-z ]{1,50}$/;
      if (!RegExp.test(usuario)) {
        errors.nombres = "Mínimo 1 y máximo 50 caracteres.";
      }
    }
  }

  //Validaciones para la contrasena
  if (!contrasena) {
    errors.contrasena = "Campo obligatorio";
  } else {
    const RegExp = REGEX_PATTERN_PASSWORD;
    if (!RegExp.test(contrasena)) {
      errors.contrasena =
        "La contraseña debe tener entre 4 y 12 caracteres y al menos un dígito.";
    }
  }

  if (!confirmContrasena) {
    errors.confirmContrasena = "Campo obligatorio";
  } else {
    const RegExp = REGEX_PATTERN_PASSWORD;
    if (!RegExp.test(confirmContrasena)) {
      errors.confirmContrasena =
        "La contraseña debe tener entre 4 y 12 caracteres y al menos un dígito.";
    }
  }

  if (confirmContrasena && contrasena) {
    if (contrasena !== confirmContrasena) {
      errors.contrasena = "Las contraseñas deben ser iguales";
      errors.confirmContrasena = "Las contraseñas deben ser iguales";
    }
  }
  return errors;
};

export const validacionesSignUpMentor = (datos) => {
  const errors = {};
  const { usuario, tipoDocumento, numeroDocumento, etapaRuta } = datos;
  //Validaciones para el tipo de documento
  if (!tipoDocumento || tipoDocumento == "-1") {
    errors.tipoDocumento = "Campo obligatorio";
  }

  //Validaciones para el tipo de documento
  if (!etapaRuta || etapaRuta == "-1") {
    errors.etapaRuta = "Campo obligatorio";
  }

  //Validaciones para el numero de documento
  if (!numeroDocumento) {
    errors.numeroDocumento = "Campo obligatorio";
  } else {
    const RegExp = REGEX_PATTERN_NUMERO_DOCUMENTO;
    if (!RegExp.test(numeroDocumento)) {
      errors.numeroDocumento = "Solo se permiten números entre 5 a 11 dígitos";
    }
  }

  //Validaciones para el usuario
  if (!usuario) {
    errors.usuario = "Campo obligatorio";
  }
  // else {
  //     const RegExp = /^[A-Za-z ]{1,50}$/;
  //     if (!RegExp.test(usuario)) {
  //       errors.nombres = "Mínimo 1 y máximo 50 caracteres.";
  //     }
  //   }
  // }

  return errors;
};

/**
 * Validaciones de primera atención
 */
export const validacionesPrimeraAtencionUsuario = (datos) => {
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
  }
  if (!vinculoConU) {
    errors.vinculoConU = "Campo Obligatorio";
  } else {
    switch (vinculoConU) {
      case T_SINAPSIS_TIPOS_CONTACTO_ESTUDIANTE:
        const { codigoEstudiantil, tipoEstudiante, programaAcademico } = datos;
        if (!codigoEstudiantil) {
          errors.codigoEstudiantil = "Campo Obligatorio";
        }
        if (!tipoEstudiante) {
          errors.tipoEstudiante = "Campo Obligatorio";
        } else {
          const { modTrabajoGrado } = datos;
          if (
            tipoEstudiante === T_SINAPSIS_NIVEL_ACADEMICO_PREGRADO &&
            !modTrabajoGrado
          ) {
            errors.modTrabajoGrado = "Campo Obligatorio";
          }
        }
        if (!programaAcademico) {
          errors.programaAcademico = "Campo Obligatorio";
        }
        break;

      case T_SINAPSIS_TIPOS_CONTACTO_EGRESADO:
        const { profesionEgresado, tipoEstudianteEgresado } = datos;
        if (!profesionEgresado) {
          errors.profesionEgresado = "Campo Obligatorio";
        }
        if (!tipoEstudianteEgresado) {
          errors.tipoEstudianteEgresado = "Campo Obligatorio";
        }
        break;

      case T_SINAPSIS_TIPOS_CONTACTO_COLABORADOR:
        const { cargoColaborador, dependenciaColaborador } = datos;
        if (!cargoColaborador) {
          errors.cargoColaborador = "Campo Obligatorio";
        }
        if (!dependenciaColaborador) {
          errors.dependenciaColaborador = "Campo Obligatorio";
        }
        break;
      case T_SINAPSIS_TIPOS_CONTACTO_EXTERNO:
        break;

      default:
        break;
    }
  }
  return errors;
};

export const validacionesPrimeraAtencionEmprendimiento = (datos) => {
  const errors = {};
  const {
    nombreEmprendimiento,
    descripcionProducto,
    necesidadesIdentificadas,
    descripcionClientes,
    // materiasPrimas,
    // enfoqueSocial,
    // sectorEmprendimiento,
    // sitioWeb,
    // redSocialFacebook,
    // redSocialInstagram,
    // redSocialTwitter,
    // redSocialTiktok,
    // redSocialYouTube,
    // redSocialWhatsApp,
    estaConstituida,
  } = datos;

  if (!nombreEmprendimiento) {
    errors.nombreEmprendimiento = "Campo Obligatorio";
  }

  if (!descripcionProducto) {
    errors.descripcionProducto = "Campo Obligatorio";
  }

  if (!necesidadesIdentificadas) {
    errors.necesidadesIdentificadas = "Campo Obligatorio";
  }

  if (!descripcionClientes) {
    errors.descripcionClientes = "Campo Obligatorio";
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
      }

      if (!nombreEmpresa) {
        errors.nombreEmpresa = "Campo Obligatorio";
      }

      if (!razonSocialEmpresa) {
        errors.razonSocialEmpresa = "Campo Obligatorio";
      }
    }
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
    desdeFechaEjecucion,
    horasSemanales,
    motivacion,
    descubrioSinapsis,
  } = datos;

  if (!nombreProducto) {
    errors.nombreProducto = "Campo Obligatorio";
  }

  if (!equipoTrabajo) {
    errors.equipoTrabajo = "Campo Obligatorio";
  } else {
    if (equipoTrabajo == "S") {
      const { cualEquipoTrabajo } = datos;

      if (!cualEquipoTrabajo) {
        errors.cualEquipoTrabajo = "Campo Obligatorio";
      }
    }
  }

  if (!dedicacion) {
    errors.dedicacion = "Campo Obligatorio";
  }

  if (!horasSemanales) {
    errors.horasSemanales = "Campo Obligatorio";
  } else {
    const RegExp = REGEX_PATTERN_SOLO_NUMEROS;
    if (!RegExp.test(horasSemanales)) {
      errors.horasSemanales = "Solo se permiten números";
    }
  }

  if (!motivacion) {
    errors.motivacion = "Campo Obligatorio";
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
        }
        break;
      }
    }
  }

  return errors;
};

export const validacionesDiagnostico = (datos) => {
  const errors = {};
  const { fileDiagnostico } = datos;

  if (!fileDiagnostico) {
    errors.fileDiagnostico = "Campo Obligatorio";
  }

  return errors;
};

export const validacionesEditarPerfil = (datos) => {
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
  }
  if (!vinculoConU) {
    errors.vinculoConU = "Campo Obligatorio";
  } else {
    switch (vinculoConU) {
      case T_SINAPSIS_TIPOS_CONTACTO_ESTUDIANTE:
        const { codigoEstudiantil, tipoEstudiante, programaAcademico } = datos;
        if (!codigoEstudiantil) {
          errors.codigoEstudiantil = "Campo Obligatorio";
        }
        if (!tipoEstudiante) {
          errors.tipoEstudiante = "Campo Obligatorio";
        } else {
          const { modTrabajoGrado } = datos;
          if (
            tipoEstudiante === T_SINAPSIS_NIVEL_ACADEMICO_PREGRADO &&
            !modTrabajoGrado
          ) {
            errors.modTrabajoGrado = "Campo Obligatorio";
          }
        }
        if (!programaAcademico) {
          errors.programaAcademico = "Campo Obligatorio";
        }
        break;

      case T_SINAPSIS_TIPOS_CONTACTO_EGRESADO:
        const { profesionEgresado, tipoEstudianteEgresado } = datos;
        if (!profesionEgresado) {
          errors.profesionEgresado = "Campo Obligatorio";
        }
        if (!tipoEstudianteEgresado) {
          errors.tipoEstudianteEgresado = "Campo Obligatorio";
        }
        break;

      case T_SINAPSIS_TIPOS_CONTACTO_COLABORADOR:
        const { cargoColaborador, dependenciaColaborador } = datos;
        if (!cargoColaborador) {
          errors.cargoColaborador = "Campo Obligatorio";
        }
        if (!dependenciaColaborador) {
          errors.dependenciaColaborador = "Campo Obligatorio";
        }
        break;
      case T_SINAPSIS_TIPOS_CONTACTO_EXTERNO:
        break;

      default:
        break;
    }
  }
  return errors;
};

/**
 * Validaciones realizadas desde interfaces comunes
 */
export const validarActualizacionContrasena = (datos) => {
  const errors = {};
  const { oldPassword, newPassword, newPasswordConfirm } = datos;

  //Validaciones para el oldPassword
  if (!oldPassword || !oldPassword.trim().length > 0) {
    errors.oldPassword = "Campo obligatorio";
  } else {
    const RegExp = REGEX_PATTERN_PASSWORD;
    if (!RegExp.test(oldPassword)) {
      errors.oldPassword =
        "La contraseña debe tener entre 4 y 12 caracteres y al menos un dígito.";
    }
  }

  //Validaciones para el newPassword
  if (!newPassword || !newPassword.trim().length > 0) {
    errors.newPassword = "Campo obligatorio";
  } else {
    const RegExp = REGEX_PATTERN_PASSWORD;
    if (!RegExp.test(newPassword)) {
      errors.newPassword =
        "La contraseña debe tener entre 4 y 12 caracteres y al menos un dígito.";
    }
  }

  //Validaciones para el newPasswordConfirm
  if (!newPasswordConfirm || !newPasswordConfirm.trim().length > 0) {
    errors.newPasswordConfirm = "Campo obligatorio";
  } else {
    const RegExp = REGEX_PATTERN_PASSWORD;
    if (!RegExp.test(newPasswordConfirm)) {
      errors.newPasswordConfirm =
        "La contraseña debe tener entre 4 y 12 caracteres y al menos un dígito.";
    }
  }

  //Validaciones para el diferencia de password
  if (newPassword && newPasswordConfirm) {
    if (newPassword !== newPasswordConfirm) {
      errors.newPassword = "Las contraseñas deben ser iguales";
      errors.newPasswordConfirm = "Las contraseñas deben ser iguales";
    }
  }

  return errors;
};

/**
 * Validaciones realizadas desde interfaz del Mentor
 */
export const validarListadoEmprendedoresMentor = (datos) => {
  const errors = {};
  const {
    numeroDocumento,
    nombreEmprendedor,
    estadoAsesoramiento,
    nombreEmprendimiento,
  } = datos;

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

  //Validaciones para el estado del emprendimiento
  if (!estadoAsesoramiento) {
    errors.estadoAsesoramiento = "Campo obligatorio";
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

export const validarFiltroReporteConsultoriaMentor = (datos) => {
  const errors = {};
  const { fechaInicio, fechaFin } = datos;

  //Validaciones para el numero de documento del emprendedor
  if (!fechaInicio && !fechaFin) {
    errors.fechaInicio = "Campo Obligatorio";
    errors.fechaFin = "Campo Obligatorio";
  } else {
    if (!fechaInicio) {
      errors.fechaInicio = "Campo Obligatorio";
    } else if (!fechaFin) {
      errors.fechaFin = "Campo Obligatorio";
    } else if (fechaInicio > fechaFin) {
      errors.fechaInicio = "La fecha de inicio no puede ser mayor a la final";
    }
  }

  return errors;
};

export const validarFinalizarAsesoramiento = (datos) => {
  const errors = {};
  const { observaciones } = datos;

  //Validaciones para el numero de documento del emprendedor
  if (!observaciones) {
    errors.observaciones = "Campo Obligatorio";
  }

  return errors;
};

/**
 * Validaciones realizadas desde interfaz del Administrador
 */
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

export const validarListadoProyectoEmprendimiento = (datos) => {
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

export const validarCrearAnuncio = (datos) => {
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

  //Validaciones para el mentor principal del emprendedor
  if (!fileAnuncio) {
    errors.fileAnuncio = "Campo Obligatorio";
  }

  return errors;
};

export const validarAsignarEtapaInicial = (datos) => {
  const errors = {};
  const { etapa, mentorPrincipal } = datos;

  //Validaciones para la etapa emprendedor
  if (!etapa) {
    errors.etapa = "Campo Obligatorio";
  }

  //Validaciones para el mentor principal del emprendedor
  if (!mentorPrincipal) {
    errors.mentorPrincipal = "Campo Obligatorio";
  }

  return errors;
};

export const validarListadoMentoresAdmin = (datos) => {
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

export const validarListadoEmprendedoresAdmin = (datos) => {
  const errors = {};
  const { numeroDocumento, nombreEmprendedor } = datos;

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

  return errors;
};

export const validarCreacionTarea = (datos) => {
  const errors = {};
  const { fileTarea, descripcionTarea, fechaEntrega, nombreTarea } = datos;
  if (!nombreTarea) {
    errors.nombreTarea = "Campo Obligatorio";
  }
  if (!descripcionTarea) {
    errors.descripcionTarea = "Campo Obligatorio";
  }
  if (!fechaEntrega) {
    errors.fechaEntrega = "Campo Obligatorio";
  } else {
    // console.log("Qui", new Date(fechaEntrega) < new Date());
    // console.log("AQui", {
    //   fechaEntrega,
    //   date: new Date(),
    //   t: new Date(fechaEntrega),
    // });

    if (new Date(fechaEntrega) < new Date()) {
      errors.fechaEntrega =
        "La fecha limite de entrega NO puede ser menor de HOY";
    }
  }

  if (!fileTarea) {
    errors.fileTarea = "Campo Obligatorio";
  } else {
    if (fileTarea.length > 1) {
      errors.fileTarea = "Solo se permite subir 1 archivo";
    }
  }
  return errors;
};

export const validarEntregaTarea = (datos) => {
  const errors = {};
  const { files, comentarioEmprendedor } = datos;

  if (comentarioEmprendedor) {
    const RegExp = REGEX_PATTERN_SOLO_LETRAS;
    if (!RegExp.test(comentarioEmprendedor)) {
      errors.comentarioEmprendedor = "Solo se permiten letras";
    }
  }

  if (!files) {
    errors.files = "Campo Obligatorio";
  } else {
    if (files.length > 1) {
      errors.files = "Solo se permite subir 1 archivo";
    }
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
    }
  }

  if (!calificacionEntrega) {
    errors.calificacionEntrega = "Campo Obligatorio";
  }

  return errors;
};
