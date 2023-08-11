export const validarFinalizarAsesoramiento = (datos) => {
  const errors = {};
  const { observaciones } = datos;

  //Validaciones para el numero de documento del emprendedor
  if (!observaciones) {
    errors.observaciones = "Campo Obligatorio";
  } else {
    if (observaciones.length > 500) {
      errors.observaciones = "Solo se permiten 500 caracteres";
    }
  }

  return errors;
};
