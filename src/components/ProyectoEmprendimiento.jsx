import { useState } from "react";
import {
  img,
  thumb,
  thumbInner,
  thumbsContainer,
} from "src/assets/styles/DropzoneStyle";
import {
  Input,
  Label,
  TextArea,
} from "src/assets/styles/emprendedor/primeraAtencion.style";
import { SubTitulo } from "src/assets/styles/emprendedor/rutaEmprendimiento.style";
import { HOST } from "src/utils/apiConstants";
import DropZone from "./DropZone";

function ProyectoEmprendimiento({ datos, setDatos, redesData, editable }) {
  const [error, setError] = useState({});

  const handleChange = (event) => {
    if (setDatos) {
      if (event.target.name == "redesSociales") {
        const redSocialId = event.target.id.split("_")[1];
        const redesSociales = datos[event.target.name];
        setDatos({
          ...datos,
          redesSociales: {
            ...redesSociales,
            [redSocialId]: {
              ...[redSocialId],
              enlace: event.target.value,
            },
          },
        });
        return;
      }

      setDatos({
        ...datos,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // let erroresFormulario = validacionesPrimeraAtencionEmprendimiento(
    //   datos
    // );
    // if (Object.keys(erroresFormulario).length) {
    //   setError(erroresFormulario);
    // } else {
    //   setError({});
    //   nextStep();
    // }
  };

  const onGetFiles = (logoEmpresa) => {
    setDatos({
      ...datos,
      logoEmpresa,
    });
  };

  if (!datos || !redesData) {
    return <h1>LOADING...</h1>;
  }

  return (
    <div>
      <form>
        <div className="container-fluid">
          <SubTitulo>Datos del emprendimiento</SubTitulo>
          <div className="mb-3">
            <Label htmlFor="nombreEmprendimiento" className="form-label">
              Nombre del emprendimiento
              <span> (*)</span>
            </Label>
            <Input
              type="text"
              className="form-control"
              id="nombreEmprendimiento"
              name="nombreEmprendimiento"
              placeholder="Nombre del emprendimiento"
              onChange={(e) => handleChange(e)}
              value={datos.nombreEmprendimiento || ""}
              disabled={!editable}
            />
            {error.nombreEmprendimiento && (
              <small className="form-text font-weight-bold text-danger">
                {error.nombreEmprendimiento}
              </small>
            )}
          </div>
          <div className="mb-3">
            <Label htmlFor="descripcionProducto" className="form-label">
              Descripción del producto<span> (*)</span>
            </Label>
            <TextArea
              type="text"
              className="form-control"
              id="descripcionProducto"
              name="descripcionProducto"
              placeholder="Descripción del producto"
              onChange={(e) => handleChange(e)}
              value={datos.descripcionProducto || ""}
              disabled={!editable}
            />
            {error.descripcionProducto && (
              <small className="form-text font-weight-bold text-danger">
                {error.descripcionProducto}
              </small>
            )}
          </div>
          <div className="mb-3">
            <Label htmlFor="necesidadesIdentificadas" className="form-label">
              Necesidades Identificadas<span> (*)</span>
            </Label>
            <TextArea
              type="text"
              className="form-control"
              id="necesidadesIdentificadas"
              name="necesidadesIdentificadas"
              placeholder="Necesidades Identificadas"
              onChange={(e) => handleChange(e)}
              value={datos.necesidadesIdentificadas || ""}
              disabled={!editable}
            />
            {error.necesidadesIdentificadas && (
              <small className="form-text font-weight-bold text-danger">
                {error.necesidadesIdentificadas}
              </small>
            )}
          </div>
          <div className="mb-3">
            <Label htmlFor="descripcionClientes" className="form-label">
              Principal cliente o usuario<span> (*)</span>
            </Label>
            <TextArea
              type="text"
              className="form-control"
              id="descripcionClientes"
              name="descripcionClientes"
              placeholder="Principal cliente o usuario"
              onChange={(e) => handleChange(e)}
              value={datos.descripcionClientes || ""}
              disabled={!editable}
            />
            {error.descripcionClientes && (
              <small className="form-text font-weight-bold text-danger">
                {error.descripcionClientes}
              </small>
            )}
          </div>
          <div className="mb-3">
            <Label htmlFor="materiasPrimas" className="form-label">
              Materias primas<span> (*)</span>
            </Label>
            <TextArea
              type="text"
              className="form-control"
              id="materiasPrimas"
              name="materiasPrimas"
              placeholder="Materias primas"
              onChange={(e) => handleChange(e)}
              value={datos.materiasPrimas || ""}
              disabled={!editable}
            />
            {error.materiasPrimas && (
              <small className="form-text font-weight-bold text-danger">
                {error.materiasPrimas}
              </small>
            )}
          </div>
          <div className="mb-3">
            <Label htmlFor="enfoqueSocial" className="form-label">
              Enfoque Social del Emprendimiento<span> (*)</span>
            </Label>
            <TextArea
              type="text"
              className="form-control"
              id="enfoqueSocial"
              name="enfoqueSocial"
              placeholder="Enfoque Social"
              onChange={(e) => handleChange(e)}
              value={datos.enfoqueSocial || ""}
              disabled={!editable}
            />
            {error.enfoqueSocial && (
              <small className="form-text font-weight-bold text-danger">
                {error.enfoqueSocial}
              </small>
            )}
          </div>
          <div className="mb-3">
            <Label htmlFor="sectorEmprendimiento" className="form-label">
              Sector del Emprendimiento
            </Label>
            <Input
              type="text"
              className="form-control"
              id="sectorEmprendimiento"
              name="sectorEmprendimiento"
              placeholder="Sitio Web"
              onChange={(e) => handleChange(e)}
              value={datos.sectorEmprendimiento || ""}
              disabled={!editable}
            />
            {error.sectorEmprendimiento && (
              <small className="form-text font-weight-bold text-danger">
                {error.sectorEmprendimiento}
              </small>
            )}
          </div>
          <div className="mb-3">
            <Label htmlFor="sitioWeb" className="form-label">
              Sitio Web
            </Label>
            <Input
              type="text"
              className="form-control"
              id="sitioWeb"
              name="sitioWeb"
              placeholder="Sitio Web"
              onChange={(e) => handleChange(e)}
              value={datos.sitioWeb || ""}
              disabled={!editable}
            />
            {error.sitioWeb && (
              <small className="form-text font-weight-bold text-danger">
                {error.sitioWeb}
              </small>
            )}
          </div>
          <SubTitulo>Redes Sociales</SubTitulo>
          <div className="row">
            {redesData &&
              redesData.length > 0 &&
              redesData.map((redSocial, index) => {
                return (
                  <div key={index} className="col-md-6 mb-3">
                    <Label
                      htmlFor={`redSocial${redSocial.id}`}
                      className="form-label"
                    >
                      {redSocial.nombre}
                    </Label>
                    <Input
                      type="text"
                      className="form-control"
                      id={`redSocial_${redSocial.id}`}
                      name={`redesSociales`}
                      onChange={(e) => handleChange(e)}
                      value={
                        datos.redesSociales[`${redSocial.id}`]
                          ? datos.redesSociales[`${redSocial.id}`]?.enlace || ""
                          : ""
                      }
                      disabled={!editable}
                    />
                    {error.redesSociales && (
                      <small className="form-text font-weight-bold text-danger">
                        {error.redesSociales}
                      </small>
                    )}
                  </div>
                );
              })}
          </div>
          <SubTitulo>Información de la empresa</SubTitulo>
          <div className="row">
            <div className="col-md-6 mb-3">
              <Label htmlFor="estaConstituida" className="form-label">
                Esta constituida
                <span> (*)</span>
              </Label>
              <select
                id="estaConstituida"
                className="form-select"
                name="estaConstituida"
                value={datos.estaConstituida || "-1"}
                onChange={(e) => handleChange(e)}
                disabled={!editable}
              >
                <option value={"-1"} disabled>
                  Seleccione...
                </option>
                <option value="S">SI</option>
                <option value="N">NO</option>
              </select>
              {error.estaConstituida && (
                <small className="form-text font-weight-bold text-danger">
                  {error.estaConstituida}
                </small>
              )}
            </div>

            {datos?.estaConstituida == "S" && (
              <>
                <div className="col-md-6 mb-3">
                  <Label htmlFor="fechaConstitucion" className="form-label">
                    Fecha de constitución
                  </Label>
                  <Input
                    type="date"
                    className="form-control"
                    name="fechaConstitucion"
                    id="fechaConstitucion"
                    value={datos.fechaConstitucion || undefined}
                    onChange={(e) => handleChange(e)}
                    disabled={!editable}
                  />
                  {error.fechaConstitucion && (
                    <small className="form-text font-weight-bold text-danger">
                      {error.fechaConstitucion}
                    </small>
                  )}
                </div>

                <div className="col-md-6 mb-3">
                  <Label htmlFor="nitEmpresa" className="form-label">
                    NIT
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="nitEmpresa"
                    name="nitEmpresa"
                    placeholder="NIT"
                    onChange={(e) => handleChange(e)}
                    value={datos.nitEmpresa || ""}
                    disabled={!editable}
                  />
                  {error.nitEmpresa && (
                    <small className="form-text font-weight-bold text-danger">
                      {error.nitEmpresa}
                    </small>
                  )}
                </div>

                <div className="col-md-6 mb-3">
                  <Label htmlFor="nombreEmpresa" className="form-label">
                    Nombre de empresa
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="nombreEmpresa"
                    name="nombreEmpresa"
                    placeholder="Nombre de la empresa"
                    onChange={(e) => handleChange(e)}
                    value={datos.nombreEmpresa || ""}
                    disabled={!editable}
                  />
                  {error.nombreEmpresa && (
                    <small className="form-text font-weight-bold text-danger">
                      {error.nombreEmpresa}
                    </small>
                  )}
                </div>

                <div className="col-md-6 mb-3">
                  <Label htmlFor="razonSocialEmpresa" className="form-label">
                    Razón social
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="razonSocialEmpresa"
                    name="razonSocialEmpresa"
                    placeholder="Razón social"
                    onChange={(e) => handleChange(e)}
                    value={datos.razonSocialEmpresa || ""}
                    disabled={!editable}
                  />
                  {error.razonSocialEmpresa && (
                    <small className="form-text font-weight-bold text-danger">
                      {error.razonSocialEmpresa}
                    </small>
                  )}
                </div>

                {editable && (
                  <div className="col-md-12 mb-3">
                    <Label
                      htmlFor="logoEmpresa"
                      className="form-label nombreInput"
                    >
                      Logo Empresa
                    </Label>
                    <DropZone upFiles={onGetFiles} files={datos?.logoEmpresa} />
                    {(datos.logoEmpresa || datos.logoEmpresaUrl) && (
                      <aside style={thumbsContainer}>
                        <div style={thumb}>
                          <div style={thumbInner}>
                            <img
                              src={
                                datos.logoEmpresa
                                  ? URL.createObjectURL(datos?.logoEmpresa[0])
                                  : datos.logoEmpresaUrl
                                  ? `${HOST}/${datos.logoEmpresaUrl}`
                                  : ""
                              }
                              style={img}
                              alt={
                                datos.files
                                  ? datos.logoEmpresa[0].name
                                  : datos.logoEmpresaUrl
                              }
                            />
                          </div>
                        </div>
                      </aside>
                    )}
                    {error.logoEmpresa && (
                      <small className="form-text font-weight-bold text-danger">
                        {error.logoEmpresa}
                      </small>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </form>

      {editable && (
        <div className="col-12 d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-primary w-25"
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            Actualizar Emprendimiento
          </button>
        </div>
      )}
    </div>
  );
}

export default ProyectoEmprendimiento;
