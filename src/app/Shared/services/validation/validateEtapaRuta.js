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
