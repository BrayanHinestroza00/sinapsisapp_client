export const validarFinalizarAsesoramiento = (datos) => {
  const errors = {};
  const { observaciones } = datos;

  //Validaciones para el numero de documento del emprendedor
  if (!observaciones) {
    errors.observaciones = "Campo Obligatorio";
  }

  return errors;
};
