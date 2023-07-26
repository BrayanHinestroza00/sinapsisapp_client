export const validacionesSonarPagePerfil = (datos, error) => {
  const errors = {};
  const { archivoPerfilEmprendedor } = datos;

  if (error.archivoPerfilEmprendedor) {
    errors.archivoPerfilEmprendedor = error.archivoPerfilEmprendedor;
  } else if (!archivoPerfilEmprendedor) {
    errors.archivoPerfilEmprendedor = "Campo Obligatorio";
  } else {
    if (archivoPerfilEmprendedor.length > 1) {
      errors.archivoPerfilEmprendedor = "Solo se permite subir 1 archivo";
    }
  }

  return errors;
};

export const validacionesSonarPageEstructuracion = (datos, error) => {
  const errors = {};
  const { archivoEstructuracionIdea } = datos;

  if (error.archivoEstructuracionIdea) {
    errors.archivoEstructuracionIdea = error.archivoEstructuracionIdea;
  } else if (!archivoEstructuracionIdea) {
    errors.archivoEstructuracionIdea = "Campo Obligatorio";
  } else {
    if (archivoEstructuracionIdea.length > 1) {
      errors.archivoEstructuracionIdea = "Solo se permite subir 1 archivo";
    }
  }

  return errors;
};

export const validacionesPensarPageBMC = (datos, error) => {
  const errors = {};
  const { archivoBMC } = datos;

  if (error.archivoBMC) {
    errors.archivoBMC = error.archivoBMC;
  } else if (!archivoBMC) {
    errors.archivoBMC = "Campo Obligatorio";
  } else {
    if (archivoBMC.length > 1) {
      errors.archivoBMC = "Solo se permite subir 1 archivo";
    }
  }

  return errors;
};

export const validacionesPensarPageLearnStartup = (datos, error) => {
  const errors = {};
  const { archivoLearnStartup } = datos;

  if (error.archivoLearnStartup) {
    errors.archivoLearnStartup = error.archivoLearnStartup;
  } else if (!archivoLearnStartup) {
    errors.archivoLearnStartup = "Campo Obligatorio";
  } else {
    if (archivoLearnStartup.length > 1) {
      errors.archivoLearnStartup = "Solo se permite subir 1 archivo";
    }
  }

  return errors;
};

export const validacionesTestearPageModeloCanvas = (datos, error) => {
  const errors = {};
  const { archivoModeloCanvas } = datos;

  if (error.archivoModeloCanvas) {
    errors.archivoModeloCanvas = error.archivoModeloCanvas;
  } else if (!archivoModeloCanvas) {
    errors.archivoModeloCanvas = "Campo Obligatorio";
  } else {
    if (archivoModeloCanvas.length > 1) {
      errors.archivoModeloCanvas = "Solo se permite subir 1 archivo";
    }
  }

  return errors;
};

export const validacionesArrancarPagePlanAccion = (datos, error) => {
  const errors = {};
  const { archivoPlanAccion } = datos;

  if (error.archivoPlanAccion) {
    errors.archivoPlanAccion = error.archivoPlanAccion;
  } else if (!archivoPlanAccion) {
    errors.archivoPlanAccion = "Campo Obligatorio";
  } else {
    if (archivoPlanAccion.length > 1) {
      errors.archivoPlanAccion = "Solo se permite subir 1 archivo";
    }
  }

  return errors;
};
