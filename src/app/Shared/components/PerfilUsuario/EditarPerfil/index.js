import { useEffect, useState } from "react";

import DropZoneComponent from "src/app/Shared/components/DropZone/DropZoneComponent";

import { Boton, BotonSiguiente, Input, Label } from "./styled";
import { useFetch } from "src/app/Shared/services/hooks/useFetch";
import {
  HTTP_METHOD_POST,
  URL_ACTUALIZAR_PERFIL_USUARIO,
} from "src/app/Shared/utils/apiConstants";
import { validacionesEditarPerfilUsuario } from "src/app/Shared/services/validation/validatePerfil";
import { confirmAlertWithText } from "src/app/Shared/utils/confirmAlerts";
import {
  messageAlert,
  messageAlertWithoutText,
} from "src/app/Shared/utils/messageAlerts";

function EditarPerfil({
  preloadData,
  allowEdit,
  setAllowEdit,
  tipoUsuario,
  onReload,
}) {
  const [error, setError] = useState({});
  const [datos, setDatos] = useState({});
  const [loading, setLoading] = useState(false);

  // Custom Hooks
  const {
    data: dataAPI,
    message: messageAPI,
    error: errorAPI,
    fetchAPI,
  } = useFetch();

  useEffect(() => {
    if (preloadData) {
      setDatos({
        idUsuario: preloadData.id,
        nombres: preloadData.nombres,
        apellidos: preloadData.apellidos,
        nombreCompleto: preloadData.nombreCompleto,
        tipoDocumento: preloadData.acronimoTipoDocumento,
        numeroDocumento: preloadData.numeroDocumento,
        correoInstitucional: preloadData.correoInstitucional,
        correoPersonal: preloadData.correoPersonal,
        telefonoContacto: preloadData.telefonoContacto,
        cargo: preloadData.cargo,
        dependencia: preloadData.dependencia,
        facultad: preloadData.facultad,
        fotoUrl: preloadData.fotoUrl,
        tipoUsuario: tipoUsuario,
      });
    }
  }, [preloadData]);

  const onHandleChange = (event) => {
    setDatos({
      ...datos,
      [event.target.name]: event.target.value,
    });
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();
    let erroresFormulario = validacionesEditarPerfilUsuario(datos);
    if (Object.keys(erroresFormulario).length) {
      setError(erroresFormulario);
    } else {
      setError({});
      confirmAlertWithText({
        title: "¿Estás seguro que deseas actualizar tu perfil?",
        text: "La información se puede modificar en cualquier momento",
        confirmButtonText: "Actualizar",
        cancelButtonText: "Cancelar",
        onConfirm: () => onSubmit(),
      });
    }
  };

  const onSubmit = () => {
    const form = new FormData();

    for (let index = 0; index < Object.values(datos).length; index++) {
      if (
        Object.values(datos)[index] != null ||
        Object.values(datos)[index] != undefined
      ) {
        if (Object.keys(datos)[index] == "fotoPerfil") {
          form.append("fotoPerfil", Object.values(datos)[index][0]);
        } else {
          form.append(Object.keys(datos)[index], Object.values(datos)[index]);
        }
      }
    }

    setLoading(true);
    fetchAPI({
      URL: URL_ACTUALIZAR_PERFIL_USUARIO,
      requestOptions: {
        method: HTTP_METHOD_POST,
        data: form,
      },
    });
  };

  const onGetFiles = (fotoPerfil) => {
    setDatos({
      ...datos,
      fotoPerfil,
    });
  };

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
        title: "Perfil actualizado correctamente",
        icon: "success",
        confirmButtonText: "Aceptar",
        onConfirm: () => {
          setAllowEdit(!allowEdit);
          onReload();
        },
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
    <form
      onSubmit={onHandleSubmit}
      encType="multipart/form-data"
      className="row g-3"
    >
      <div className="col-md-6">
        <Label htmlFor="nombreCompleto" className="form-label">
          Nombre Completo
        </Label>
        <Input
          type="text"
          className="form-control"
          id="nombreCompleto"
          value={`${datos.nombreCompleto}`}
          disabled
        />
      </div>

      <div className="col-md-6">
        <Label htmlFor="docIdentificacion" className="form-label">
          Documento de Identificación
        </Label>
        <Input
          type="text"
          className="form-control"
          id="docIdentificacion"
          value={`${datos.tipoDocumento} - ${datos.numeroDocumento}`}
          disabled
        />
      </div>

      <div className="col-md-6">
        <Label htmlFor="correoInstitucional" className="form-label">
          Correo Institucional
        </Label>
        <Input
          type="text"
          className="form-control"
          name="correoInstitucional"
          id="correoInstitucional"
          value={datos.correoInstitucional ? datos.correoInstitucional : ""}
          onChange={(e) => onHandleChange(e)}
        />
        {error.correoInstitucional && (
          <small className="form-text font-weight-bold text-danger">
            {error.correoInstitucional}
          </small>
        )}
      </div>

      <div className="col-md-6">
        <Label htmlFor="correoPersonal" className="form-label">
          Correo Personal
        </Label>
        <Input
          type="text"
          className="form-control"
          name="correoPersonal"
          id="correoPersonal"
          value={datos.correoPersonal ? datos.correoPersonal : ""}
          onChange={(e) => onHandleChange(e)}
        />
        {error.correoPersonal && (
          <small className="form-text font-weight-bold text-danger">
            {error.correoPersonal}
          </small>
        )}
      </div>

      <div className="col-md-6">
        <Label htmlFor="telefonoContacto" className="form-label">
          Teléfono de contacto
        </Label>
        <Input
          type="text"
          className="form-control inputDiag"
          name="telefonoContacto"
          id="telefonoContacto"
          value={datos.telefonoContacto != null ? datos.telefonoContacto : ""}
          onChange={(e) => onHandleChange(e)}
        />
        {error.telefonoContacto && (
          <small className="form-text font-weight-bold text-danger">
            {error.telefonoContacto}
          </small>
        )}
      </div>

      <div className="col-md-6">
        <Label htmlFor="dependencia" className="form-label">
          Dependencia
        </Label>
        <Input
          type="text"
          className="form-control"
          name="dependencia"
          id="dependencia"
          value={datos.dependencia ? datos.dependencia : ""}
          onChange={(e) => onHandleChange(e)}
        />
        {error.dependencia && (
          <small className="form-text font-weight-bold text-danger">
            {error.dependencia}
          </small>
        )}
      </div>

      <div className="col-md-6">
        <Label htmlFor="facultad" className="form-label">
          Facultad
        </Label>
        <Input
          type="text"
          className="form-control"
          name="facultad"
          id="facultad"
          value={datos.facultad ? datos.facultad : ""}
          onChange={(e) => onHandleChange(e)}
        />
        {error.facultad && (
          <small className="form-text font-weight-bold text-danger">
            {error.facultad}
          </small>
        )}
      </div>

      <div className="col-md-6">
        <Label htmlFor="cargo" className="form-label">
          Cargo
          <span className="text-danger"> (*)</span>
        </Label>
        <Input
          type="text"
          className="form-control"
          name="cargo"
          id="cargo"
          value={datos.cargo ? datos.cargo : ""}
          onChange={(e) => onHandleChange(e)}
        />
        {error.cargo && (
          <small className="form-text font-weight-bold text-danger">
            {error.cargo}
          </small>
        )}
      </div>
      <div className="col-md-12">
        <Label htmlFor="fotoPerfil" className="form-label nombreInput">
          Foto de Perfil
        </Label>

        <DropZoneComponent
          upFiles={onGetFiles}
          files={datos?.fotoPerfil}
          filesUrl={datos?.fotoUrl}
        />

        {error.fotoPerfil && (
          <small className="form-text font-weight-bold text-danger">
            {error.fotoPerfil}
          </small>
        )}
      </div>

      <div className="col-12 d-flex flex-row-reverse">
        <BotonSiguiente
          type="submit"
          style={{ height: "auto" }}
          className="btn btn-primary"
        >
          Actualizar Datos
        </BotonSiguiente>

        <Boton
          type="button"
          style={{ height: "auto" }}
          className="btn btn-secondary"
          onClick={(e) => {
            setAllowEdit(!allowEdit);
          }}
        >
          Cancelar
        </Boton>
      </div>
    </form>
  );
}

export default EditarPerfil;
