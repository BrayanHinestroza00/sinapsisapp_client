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
