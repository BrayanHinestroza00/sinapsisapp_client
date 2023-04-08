import { REGEX_PATTERN_SOLO_LETRAS } from "./regexPatterns";

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
    const RegExp = /^\D*\d{5,11}$/;
    if (!RegExp.test(numeroDocumento)) {
      errors.numeroDocumento = "Solo se permiten números entre 5 a 11 dígitos";
    }
  }

  //Validaciones para la contrasena
  if (!password) {
    errors.password = "Campo obligatorio";
  } else {
    const RegExp = /^(?=.*\d).{4,8}$/;
    if (!RegExp.test(password)) {
      errors.password =
        "La contraseña debe tener entre 4 y 8 caracteres y al menos un dígito.";
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
    const RegExp = /^\D*\d{5,11}$/;
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
    const RegExp =
      /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (!RegExp.test(correo)) {
      errors.correo = "El correo no es válido";
    }
  }

  //Validaciones para la contrasena
  if (!contrasena) {
    errors.contrasena = "Campo obligatorio";
  } else {
    const RegExp = /^(?=.*\d).{4,8}$/;
    if (!RegExp.test(contrasena)) {
      errors.contrasena =
        "La contraseña debe tener entre 4 y 8 caracteres y al menos un dígito.";
    }
  }

  if (!confirmContrasena) {
    errors.confirmContrasena = "Campo obligatorio";
  } else {
    const RegExp = /^(?=.*\d).{4,8}$/;
    if (!RegExp.test(confirmContrasena)) {
      errors.confirmContrasena =
        "La contraseña debe tener entre 4 y 8 caracteres y al menos un dígito.";
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
    const RegExp = /^\D*\d{5,11}$/;
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
    const RegExp = /^(?=.*\d).{4,8}$/;
    if (!RegExp.test(contrasena)) {
      errors.contrasena =
        "La contraseña debe tener entre 4 y 8 caracteres y al menos un dígito.";
    }
  }

  if (!confirmContrasena) {
    errors.confirmContrasena = "Campo obligatorio";
  } else {
    const RegExp = /^(?=.*\d).{4,8}$/;
    if (!RegExp.test(confirmContrasena)) {
      errors.confirmContrasena =
        "La contraseña debe tener entre 4 y 8 caracteres y al menos un dígito.";
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

export const validacionesPrimeraAtencionUsuario = (datos) => {
  const errors = {};
  const {
    fechaNacimiento,
    genero,
    telefono,
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
  if (telefono) {
    const RegExp = /^\D*\d{1,10}$/;
    if (!RegExp.test(celular)) {
      errors.celular = "Solo se permiten números y máximo 10 dígitos";
    }
  }
  if (celular) {
    const RegExp = /^\D*\d{1,10}$/;
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
      case "Estudiante":
        const { codigoEstudiantil, tipoEstudiante, programaAcademico } = datos;
        if (!codigoEstudiantil) {
          errors.codigoEstudiantil = "Campo Obligatorio";
        }
        if (!tipoEstudiante) {
          errors.tipoEstudiante = "Campo Obligatorio";
        } else {
          const { modTrabajoGrado } = datos;
          if (tipoEstudiante === "PREGRADO" && !modTrabajoGrado) {
            errors.modTrabajoGrado = "Campo Obligatorio";
          }
        }
        if (!programaAcademico) {
          errors.programaAcademico = "Campo Obligatorio";
        }
        break;

      case "Egresado":
        const { profesionEgresado, tipoEstudianteEgresado } = datos;
        if (!profesionEgresado) {
          errors.profesionEgresado = "Campo Obligatorio";
        }
        if (!tipoEstudianteEgresado) {
          errors.tipoEstudianteEgresado = "Campo Obligatorio";
        }
        break;

      case "Colaborador":
        const { cargoColaborador, dependenciaColaborador } = datos;
        if (!cargoColaborador) {
          errors.cargoColaborador = "Campo Obligatorio";
        }
        if (!dependenciaColaborador) {
          errors.dependenciaColaborador = "Campo Obligatorio";
        }
        break;
      case "Externo":
        break;

      default:
        break;
    }
  }
  return errors;
};

export const validacionesPrimeraAtencionEmprendimiento = (datos) => {
  const errors = {};
  // const {
  //   nombreEmprendimiento,
  //   estaConstituida,
  //   descripcionProducto,
  //   materiasPrimas,
  //   clienteEmprendimiento,
  //   nombreEmpresa,
  //   nitEmpresa,
  //   fechaCreacionEmpresa,
  //   razonSocialEmpresa,
  // } = datos;

  // if (!nombreEmprendimiento) {
  //   errors.nombreEmprendimiento = "Campo Obligatorio";
  // }

  // if (!estaConstituida) {
  //   errors.estaConstituida = "Campo Obligatorio";
  // } else {
  //   if (estaConstituida === "SI") {
  //     const { fechaConstitucion } = datos;
  //     if (!fechaConstitucion) {
  //       errors.fechaConstitucion = "Campo Obligatorio";
  //     }
  //   }
  // }

  // if (!descripcionProducto) {
  //   errors.descripcionProducto = "Campo Obligatorio";
  // }

  // if (!materiasPrimas) {
  //   errors.materiasPrimas = "Campo Obligatorio";
  // }

  // if (!clienteEmprendimiento) {
  //   errors.clienteEmprendimiento = "Campo Obligatorio";
  // }

  // if (
  //   nombreEmpresa ||
  //   nitEmpresa ||
  //   fechaCreacionEmpresa ||
  //   razonSocialEmpresa
  // ) {
  //   if (!nombreEmpresa) {
  //     errors.nombreEmpresa = "Campo Obligatorio";
  //   }

  //   if (!nitEmpresa) {
  //     errors.nitEmpresa = "Campo Obligatorio";
  //   }

  //   if (!fechaCreacionEmpresa) {
  //     errors.fechaCreacionEmpresa = "Campo Obligatorio";
  //   }

  //   if (!razonSocialEmpresa) {
  //     errors.razonSocialEmpresa = "Campo Obligatorio";
  //   }
  // }

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
    telefono,
    celular,
    departamentoId,
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
  if (telefono) {
    const RegExp = /^\D*\d{1,10}$/;
    if (!RegExp.test(celular)) {
      errors.celular = "Solo se permiten números y máximo 10 dígitos";
    }
  }
  if (celular) {
    const RegExp = /^\D*\d{1,10}$/;
    if (!RegExp.test(celular)) {
      errors.celular = "Solo se permiten números y máximo 10 dígitos";
    }
  }
  if (!departamentoId) {
    errors.departamentoId = "Campo Obligatorio";
  }
  if (!municipioId) {
    errors.municipioId = "Campo Obligatorio";
  }
  if (!direccion) {
    errors.direccion = "Campo Obligatorio";
  }
  if (!vinculoConU) {
    errors.vinculoConU = "Campo Obligatorio";
  } else {
    switch (vinculoConU) {
      case "Estudiante":
        const { codigoEstudiantil, tipoEstudiante, programaAcademico } = datos;
        if (!codigoEstudiantil) {
          errors.codigoEstudiantil = "Campo Obligatorio";
        }
        if (!tipoEstudiante) {
          errors.tipoEstudiante = "Campo Obligatorio";
        } else {
          const { modTrabajoGrado } = datos;
          if (tipoEstudiante === "PREGRADO" && !modTrabajoGrado) {
            errors.modTrabajoGrado = "Campo Obligatorio";
          }
        }
        if (!programaAcademico) {
          errors.programaAcademico = "Campo Obligatorio";
        }
        break;

      case "Egresado":
        const { profesionEgresado, tipoEstudianteEgresado } = datos;
        if (!profesionEgresado) {
          errors.profesionEgresado = "Campo Obligatorio";
        }
        if (!tipoEstudianteEgresado) {
          errors.tipoEstudianteEgresado = "Campo Obligatorio";
        }
        break;

      case "Colaborador":
        const { cargoColaborador, dependenciaColaborador } = datos;
        if (!cargoColaborador) {
          errors.cargoColaborador = "Campo Obligatorio";
        }
        if (!dependenciaColaborador) {
          errors.dependenciaColaborador = "Campo Obligatorio";
        }
        break;
      case "Externo":
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
  }

  //Validaciones para el newPassword
  if (!newPassword || !newPassword.trim().length > 0) {
    errors.newPassword = "Campo obligatorio";
  }

  //Validaciones para el newPasswordConfirm
  if (!newPasswordConfirm || !newPasswordConfirm.trim().length > 0) {
    errors.newPasswordConfirm = "Campo obligatorio";
  }

  //Validaciones para el diferencia de password
  if (newPassword && newPasswordConfirm) {
    if (newPassword != newPasswordConfirm) {
      errors.newPasswordConfirm = "Las contraseñas no coinciden";
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
    const RegExp = /^\D*\d{5,11}$/;
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
