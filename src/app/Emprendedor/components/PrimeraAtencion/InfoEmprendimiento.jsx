import { useEffect, useState } from "react";

import DropZoneComponent from "src/app/Shared/components/DropZone/DropZoneComponent";

import {
  Boton,
  BotonSiguiente,
  Circulo,
  Contenido,
  Input,
  Label,
  Paso,
  TextArea,
  TituloStepByStep,
} from "./styled";
import { Subtitulo } from "src/app/Shared/assets/styles/Common";
import { validacionesPrimeraAtencionEmprendimiento } from "src/app/Shared/services/validation/validatePrimeraAtencion";
import LoadingSpinner from "src/app/Shared/components/LoadingSpinner/LoadingSpinner";
import {
  HTTP_METHOD_GET,
  URL_OBTENER_REDES_SOCIALES,
} from "src/app/Shared/utils/apiConstants";
import { useFetch } from "src/app/Shared/services/hooks/useFetch";

function InfoEmprendimiento(props) {
  const [error, setError] = useState({});

  // Custom Hooks
  const {
    data: redesData,
    error: redesError,
    message: redesMessage,
    loading: redesLoading,
    fetchAPI: fetchApiRedes,
  } = useFetch();

  useEffect(() => {
    fetchApiRedes({
      URL: URL_OBTENER_REDES_SOCIALES,
      requestOptions: {
        method: HTTP_METHOD_GET,
      },
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let erroresFormulario = validacionesPrimeraAtencionEmprendimiento(
      props.datos
    );
    if (Object.keys(erroresFormulario).length) {
      setError(erroresFormulario);
    } else {
      setError({});
      props.nextStep();
    }
  };

  const onGetFiles = (files) => {
    props.getLogoEmpresa(files);
  };

  return (
    <Contenido
      className="container"
      style={{ backgroundColor: "#FFF", padding: "1rem 10rem" }}
    >
      <div className="text-center">
        <Circulo>
          <Paso>2</Paso>
        </Circulo>
        <TituloStepByStep>Información del Emprendimiento</TituloStepByStep>
      </div>

      <form className="row g-3">
        <Subtitulo>Datos del Emprendimiento</Subtitulo>
        <div className="mb-3">
          <Label htmlFor="nombreEmprendimiento" className="form-label">
            Nombre del emprendimiento
            <span className="text-danger"> (*)</span>
          </Label>
          <Input
            type="text"
            className="form-control"
            id="nombreEmprendimiento"
            name="nombreEmprendimiento"
            placeholder="Nombre del emprendimiento"
            onChange={(e) => props.handleChange(e)}
            value={props.datos.nombreEmprendimiento || ""}
          />
          {error.nombreEmprendimiento && (
            <small className="form-text font-weight-bold text-danger">
              {error.nombreEmprendimiento}
            </small>
          )}
        </div>

        <div className="mb-3">
          <Label htmlFor="descripcionProducto" className="form-label">
            Descripción del producto <span className="text-danger"> (*)</span>
          </Label>
          <TextArea
            type="text"
            className="form-control"
            id="descripcionProducto"
            name="descripcionProducto"
            placeholder="Descripción del producto"
            onChange={(e) => props.handleChange(e)}
            value={props.datos.descripcionProducto || ""}
          />
          {error.descripcionProducto && (
            <small className="form-text font-weight-bold text-danger">
              {error.descripcionProducto}
            </small>
          )}
        </div>

        <div className="mb-3">
          <Label htmlFor="necesidadesIdentificadas" className="form-label">
            Necesidades identificadas <span className="text-danger"> (*)</span>
          </Label>
          <TextArea
            type="text"
            className="form-control"
            id="necesidadesIdentificadas"
            name="necesidadesIdentificadas"
            placeholder="Necesidades Identificadas"
            onChange={(e) => props.handleChange(e)}
            value={props.datos.necesidadesIdentificadas || ""}
          />
          {error.necesidadesIdentificadas && (
            <small className="form-text font-weight-bold text-danger">
              {error.necesidadesIdentificadas}
            </small>
          )}
        </div>

        <div className="mb-3">
          <Label htmlFor="descripcionClientes" className="form-label">
            Principal cliente o usuario
            <span className="text-danger"> (*)</span>
          </Label>
          <TextArea
            type="text"
            className="form-control"
            id="descripcionClientes"
            name="descripcionClientes"
            placeholder="Principal cliente o usuario"
            onChange={(e) => props.handleChange(e)}
            value={props.datos.descripcionClientes || ""}
          />
          {error.descripcionClientes && (
            <small className="form-text font-weight-bold text-danger">
              {error.descripcionClientes}
            </small>
          )}
        </div>

        <div className="mb-3">
          <Label htmlFor="materiasPrimas" className="form-label">
            Materias primas
          </Label>
          <TextArea
            type="text"
            className="form-control"
            id="materiasPrimas"
            name="materiasPrimas"
            placeholder="Materias primas"
            onChange={(e) => props.handleChange(e)}
            value={props.datos.materiasPrimas || ""}
          />
          {error.materiasPrimas && (
            <small className="form-text font-weight-bold text-danger">
              {error.materiasPrimas}
            </small>
          )}
        </div>

        <div className="mb-3">
          <Label htmlFor="enfoqueSocial" className="form-label">
            Enfoque social del emprendimiento
          </Label>
          <TextArea
            type="text"
            className="form-control"
            id="enfoqueSocial"
            name="enfoqueSocial"
            placeholder="Enfoque Social"
            onChange={(e) => props.handleChange(e)}
            value={props.datos.enfoqueSocial || ""}
          />
          {error.enfoqueSocial && (
            <small className="form-text font-weight-bold text-danger">
              {error.enfoqueSocial}
            </small>
          )}
        </div>

        <div className="mb-3">
          <Label htmlFor="sectorEmprendimiento" className="form-label">
            Sector del emprendimiento
          </Label>
          <Input
            type="text"
            className="form-control"
            id="sectorEmprendimiento"
            name="sectorEmprendimiento"
            placeholder="Sector del Emprendimiento"
            onChange={(e) => props.handleChange(e)}
            value={props.datos.sectorEmprendimiento || ""}
          />
          {error.sectorEmprendimiento && (
            <small className="form-text font-weight-bold text-danger">
              {error.sectorEmprendimiento}
            </small>
          )}
        </div>

        <div className="mb-3">
          <Label htmlFor="sitioWeb" className="form-label">
            Sitio web
          </Label>
          <Input
            type="text"
            className="form-control"
            id="sitioWeb"
            name="sitioWeb"
            placeholder="Sitio Web"
            onChange={(e) => props.handleChange(e)}
            value={props.datos.sitioWeb || ""}
          />
          {error.sitioWeb && (
            <small className="form-text font-weight-bold text-danger">
              {error.sitioWeb}
            </small>
          )}
        </div>

        <Subtitulo>Redes Sociales</Subtitulo>

        <div className="row">
          {redesLoading ? (
            <LoadingSpinner width="25px" height="25px" />
          ) : redesError || redesMessage ? (
            <>
              {redesError && <p>{redesError}</p>}

              {redesMessage && <p>{redesMessage}</p>}
            </>
          ) : (
            redesData &&
            redesData.length > 0 &&
            redesData.map((redSocial, index) => {
              console.log("here", { redSocial, datos: props.datos });
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
                    onChange={(e) => props.handleChange(e)}
                    value={
                      props.datos.redesSociales
                        ? props.datos.redesSociales[`${redSocial.id}`]
                          ? props.datos.redesSociales[`${redSocial.id}`].enlace
                          : ""
                        : ""
                    }
                  />
                  {error.redesSociales && (
                    <small className="form-text font-weight-bold text-danger">
                      {error.redesSociales}
                    </small>
                  )}
                </div>
              );
            })
          )}
        </div>

        <Subtitulo>Información de la Empresa</Subtitulo>

        <div className="col-md-6 mb-3">
          <Label htmlFor="estaConstituida" className="form-label">
            Está constituida
            <span className="text-danger"> (*)</span>
          </Label>
          <select
            id="estaConstituida"
            className="form-select"
            name="estaConstituida"
            value={props.datos.estaConstituida || "-1"}
            onChange={(e) => props.handleChange(e)}
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

        {props.datos?.estaConstituida == "S" && (
          <>
            <div className="col-md-6 mb-3">
              <Label htmlFor="fechaConstitucion" className="form-label">
                Fecha de constitución <span className="text-danger"> (*)</span>
              </Label>
              <Input
                type="date"
                className="form-control"
                name="fechaConstitucion"
                id="fechaConstitucion"
                value={props.datos.fechaConstitucion || undefined}
                onChange={(e) => props.handleChange(e)}
              />
              {error.fechaConstitucion && (
                <small className="form-text font-weight-bold text-danger">
                  {error.fechaConstitucion}
                </small>
              )}
            </div>

            <div className="col-md-6 mb-3">
              <Label htmlFor="nitEmpresa" className="form-label">
                NIT <span className="text-danger"> (*)</span>
              </Label>
              <Input
                type="text"
                className="form-control"
                id="nitEmpresa"
                name="nitEmpresa"
                placeholder="NIT"
                onChange={(e) => props.handleChange(e)}
                value={props.datos.nitEmpresa || ""}
              />
              {error.nitEmpresa && (
                <small className="form-text font-weight-bold text-danger">
                  {error.nitEmpresa}
                </small>
              )}
            </div>

            <div className="col-md-6 mb-3">
              <Label htmlFor="nombreEmpresa" className="form-label">
                Nombre de empresa <span className="text-danger"> (*)</span>
              </Label>
              <Input
                type="text"
                className="form-control"
                id="nombreEmpresa"
                name="nombreEmpresa"
                placeholder="Nombre de la empresa"
                onChange={(e) => props.handleChange(e)}
                value={props.datos.nombreEmpresa || ""}
              />
              {error.nombreEmpresa && (
                <small className="form-text font-weight-bold text-danger">
                  {error.nombreEmpresa}
                </small>
              )}
            </div>

            <div className="col-md-6 mb-3">
              <Label htmlFor="razonSocialEmpresa" className="form-label">
                Razón social <span className="text-danger"> (*)</span>
              </Label>
              <Input
                type="text"
                className="form-control"
                id="razonSocialEmpresa"
                name="razonSocialEmpresa"
                placeholder="Razón social"
                onChange={(e) => props.handleChange(e)}
                value={props.datos.razonSocialEmpresa || ""}
              />
              {error.razonSocialEmpresa && (
                <small className="form-text font-weight-bold text-danger">
                  {error.razonSocialEmpresa}
                </small>
              )}
            </div>

            <div className="mb-3">
              <Label htmlFor="logoEmpresa" className="form-label nombreInput">
                Logo Empresa
              </Label>

              <DropZoneComponent
                upFiles={onGetFiles}
                files={props?.logoEmpresa}
              />

              {error.logoEmpresa && (
                <small className="form-text font-weight-bold text-danger">
                  {error.logoEmpresa}
                </small>
              )}
            </div>
          </>
        )}
      </form>

      <div className="col-12 d-flex justify-content-end">
        <Boton
          type="button"
          className="btn btn-outline-primary"
          style={{ height: "auto" }}
          onClick={() => {
            props.prevStep();
          }}
        >
          Volver
        </Boton>

        <BotonSiguiente
          type="button"
          className="btn btn-primary"
          style={{ height: "auto" }}
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          Siguiente
        </BotonSiguiente>
      </div>
    </Contenido>
  );
}

export default InfoEmprendimiento;
