import { useEffect, useState } from "react";
import moment from "moment";

import DropZoneComponent from "../../DropZone/DropZoneComponent";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

import {
  Subtitulo,
  Input,
  Label,
  TextArea,
} from "src/app/Shared/assets/styles/Common.js";
import { validacionesPrimeraAtencionEmprendimiento } from "src/app/Shared/services/validation/validatePrimeraAtencion";
import {
  HTTP_METHOD_POST,
  URL_ACTUALIZAR_EMPRENDIMIENTO,
} from "src/app/Shared/utils/apiConstants";
import {
  SINAPSIS_APP_FORMATO_FECHA,
  SINAPSIS_APP_FORMATO_FECHA_INPUT,
} from "src/app/Shared/utils/constants";
import { confirmAlertWithText } from "src/app/Shared/utils/confirmAlerts";
import { useFetch } from "src/app/Shared/services/hooks/useFetch";
import {
  messageAlert,
  messageAlertWithoutText,
} from "src/app/Shared/utils/messageAlerts";
import { getArchivo } from "src/app/Shared/utils/utilityFunctions";

import default_image from "src/app/Shared/assets/images/default_profile_picture.png";

function EmprendimientoComponent({
  datos,
  setDatos,
  redesData,
  editable,
  reloadData,
}) {
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [datosImagen, setDatosImagen] = useState({});

  // Custom Hooks
  const {
    data: dataAPI,
    message: messageAPI,
    error: errorAPI,
    fetchAPI,
  } = useFetch();

  useEffect(() => {
    obtenerImagen();
  }, []);

  const obtenerImagen = async () => {
    if (datos.logoEmpresaUrl) {
      const imagen = await getArchivo(datos.logoEmpresaUrl);
      setDatosImagen(`data:${imagen.contentType};base64,${imagen.file}`);
    } else {
      setDatosImagen(default_image);
    }
  };

  const onHandleChange = (event) => {
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
              idRedSocial: redSocialId,
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

  const onHandleSubmit = (e) => {
    e.preventDefault();
    let erroresFormulario = validacionesPrimeraAtencionEmprendimiento(datos);
    if (Object.keys(erroresFormulario).length) {
      setError(erroresFormulario);
    } else {
      setError({});
      confirmAlertWithText({
        title: "¿Estás seguro que deseas actualizar el emprendimiento?",
        text: "La información se puede modificar en cualquier momento",
        confirmButtonText: "Actualizar",
        cancelButtonText: "Cancelar",
        onConfirm: () => submitForm(),
      });
    }
  };

  const submitForm = () => {
    const form = new FormData();

    for (let index = 0; index < Object.values(datos).length; index++) {
      if (
        Object.values(datos)[index] != null ||
        Object.values(datos)[index] != undefined
      ) {
        if (Object.keys(datos)[index] == "logoEmpresa") {
          form.append(
            Object.keys(datos)[index],
            Object.values(datos)[index][0]
          );
        } else if (Object.keys(datos)[index] == "fechaConstitucion") {
          const fechaConstitucion = moment(
            Object.values(datos)[index],
            SINAPSIS_APP_FORMATO_FECHA_INPUT
          ).format(SINAPSIS_APP_FORMATO_FECHA);

          form.append("fechaConstitucion", fechaConstitucion);
        } else if (Object.keys(datos)[index] == "redesSociales") {
          const redesSociales = Object.values(datos)[index];

          if (Object.keys(redesSociales).length > 0) {
            let arrayOfRedesSociales = [];
            for (
              let index = 0;
              index < Object.keys(redesSociales).length;
              index++
            ) {
              const element = redesSociales[Object.keys(redesSociales)[index]];
              arrayOfRedesSociales.push({
                idRedSocial: Object.keys(redesSociales)[index],
                enlace: element.enlace,
              });
            }

            form.append(
              Object.keys(datos)[index],
              JSON.stringify(arrayOfRedesSociales)
            );
          }
        } else {
          form.append(Object.keys(datos)[index], Object.values(datos)[index]);
        }
      }
    }

    setLoading(true);
    fetchAPI({
      URL: URL_ACTUALIZAR_EMPRENDIMIENTO,
      requestOptions: {
        method: HTTP_METHOD_POST,
        data: form,
      },
    });
  };

  const onGetFiles = (logoEmpresa) => {
    setDatos({
      ...datos,
      logoEmpresa,
    });
  };

  if (!datos || !redesData) {
    return <LoadingSpinner width="5rem" height="5rem" />;
  }

  if (loading && errorAPI) {
    messageAlert({
      title: "Algo ha fallado",
      text: errorAPI,
      icon: "error",
      confirmButtonText: "Aceptar",
    });
    setLoading(false);
  } else if (loading && messageAPI) {
    if (messageAPI == "OK") {
      messageAlertWithoutText({
        title: "Actualizado correctamente!",
        icon: "success",
        confirmButtonText: "Aceptar",
        onConfirm: () => reloadData(),
      });
    } else {
      messageAlertWithoutText({
        title: messageAPI,
        icon: "warning",
        confirmButtonText: "Aceptar",
      });
    }
    setLoading(false);
  }

  return (
    <div>
      <form>
        <div className="container-fluid">
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
              onChange={(e) => onHandleChange(e)}
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
              Descripción del producto<span className="text-danger"> (*)</span>
            </Label>
            <TextArea
              type="text"
              className="form-control"
              id="descripcionProducto"
              name="descripcionProducto"
              placeholder="Descripción del producto"
              onChange={(e) => onHandleChange(e)}
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
              Necesidades identificadas<span className="text-danger"> (*)</span>
            </Label>
            <TextArea
              type="text"
              className="form-control"
              id="necesidadesIdentificadas"
              name="necesidadesIdentificadas"
              placeholder="Necesidades identificadas"
              onChange={(e) => onHandleChange(e)}
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
              Principal cliente o usuario
              <span className="text-danger"> (*)</span>
            </Label>
            <TextArea
              type="text"
              className="form-control"
              id="descripcionClientes"
              name="descripcionClientes"
              placeholder="Principal cliente o usuario"
              onChange={(e) => onHandleChange(e)}
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
              Materias primas
            </Label>
            <TextArea
              type="text"
              className="form-control"
              id="materiasPrimas"
              name="materiasPrimas"
              placeholder="Materias primas"
              onChange={(e) => onHandleChange(e)}
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
              Enfoque social del emprendimiento
            </Label>
            <TextArea
              type="text"
              className="form-control"
              id="enfoqueSocial"
              name="enfoqueSocial"
              placeholder="Enfoque social"
              onChange={(e) => onHandleChange(e)}
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
              Sector del emprendimiento
            </Label>
            <Input
              type="text"
              className="form-control"
              id="sectorEmprendimiento"
              name="sectorEmprendimiento"
              placeholder="Sector del emprendimiento"
              onChange={(e) => onHandleChange(e)}
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
              Sitio web
            </Label>
            <Input
              type="text"
              className="form-control"
              id="sitioWeb"
              name="sitioWeb"
              placeholder="Sitio web"
              onChange={(e) => onHandleChange(e)}
              value={datos.sitioWeb || ""}
              disabled={!editable}
            />
            {error.sitioWeb && (
              <small className="form-text font-weight-bold text-danger">
                {error.sitioWeb}
              </small>
            )}
          </div>
          <Subtitulo>Redes Sociales</Subtitulo>
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
                      onChange={(e) => onHandleChange(e)}
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
          <Subtitulo>Información de la Empresa</Subtitulo>
          <div className="row">
            <div className="col-md-6 mb-3">
              <Label htmlFor="estaConstituida" className="form-label">
                ¿Está constituida?
                <span className="text-danger"> (*)</span>
              </Label>
              <select
                id="estaConstituida"
                className="form-select"
                name="estaConstituida"
                value={datos.estaConstituida || "-1"}
                onChange={(e) => onHandleChange(e)}
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
                    <span className="text-danger"> (*)</span>
                  </Label>
                  <Input
                    type="date"
                    className="form-control"
                    name="fechaConstitucion"
                    id="fechaConstitucion"
                    value={datos.fechaConstitucion || undefined}
                    onChange={(e) => onHandleChange(e)}
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
                    <span className="text-danger"> (*)</span>
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="nitEmpresa"
                    name="nitEmpresa"
                    placeholder="NIT"
                    onChange={(e) => onHandleChange(e)}
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
                    <span className="text-danger"> (*)</span>
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="nombreEmpresa"
                    name="nombreEmpresa"
                    placeholder="Nombre de la empresa"
                    onChange={(e) => onHandleChange(e)}
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
                    <span className="text-danger"> (*)</span>
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="razonSocialEmpresa"
                    name="razonSocialEmpresa"
                    placeholder="Razón social"
                    onChange={(e) => onHandleChange(e)}
                    value={datos.razonSocialEmpresa || ""}
                    disabled={!editable}
                  />
                  {error.razonSocialEmpresa && (
                    <small className="form-text font-weight-bold text-danger">
                      {error.razonSocialEmpresa}
                    </small>
                  )}
                </div>

                <div className="col-md-12 mb-3">
                  {editable ? (
                    <>
                      <Label htmlFor="logoEmpresa" className="form-label">
                        Logo empresa
                      </Label>
                      <DropZoneComponent
                        upFiles={onGetFiles}
                        files={datos?.logoEmpresa}
                        filesUrl={datos.logoEmpresaUrl}
                      />

                      {error.logoEmpresa && (
                        <small className="form-text font-weight-bold text-danger">
                          {error.logoEmpresa}
                        </small>
                      )}
                    </>
                  ) : datosImagen == null ? (
                    <LoadingSpinner width="30%" height="30%" />
                  ) : (
                    <div className="d-flex flex-column">
                      <Label htmlFor="logoEmpresa" className="form-label">
                        Logo empresa
                      </Label>
                      <img
                        src={datosImagen}
                        alt="Foto de perfil"
                        width={"30%"}
                      />
                    </div>
                  )}
                </div>
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
              onHandleSubmit(e);
            }}
          >
            Actualizar Emprendimiento
          </button>
        </div>
      )}
    </div>
  );
}

export default EmprendimientoComponent;
