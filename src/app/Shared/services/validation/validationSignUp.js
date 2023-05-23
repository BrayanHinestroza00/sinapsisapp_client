import {
  REGEX_PATTERN_CORREO_ELECTRONICO,
  REGEX_PATTERN_NUMERO_DOCUMENTO,
  REGEX_PATTERN_PASSWORD,
} from "../../utils/regexPatterns";

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
