import { useContext, useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

import InfoEmprendimiento from "src/app/Emprendedor/components/PrimeraAtencion/InfoEmprendimiento";
import Confirmacion from "src/app/Emprendedor/components/PrimeraAtencion/Confirmacion";
import InfoUsuario from "src/app/Emprendedor/components/PrimeraAtencion/InfoUsuario";
import InfoPrimeraAtencion from "src/app/Emprendedor/components/PrimeraAtencion/InfoPrimeraAtencion";
import InfoDiagnostico from "src/app/Emprendedor/components/PrimeraAtencion/InfoDiagnostico";

import {
  HTTP_METHOD_POST,
  URL_REGISTRAR_PRIMERA_ATENCION,
} from "src/app/Shared/utils/apiConstants";
import { EmprendedorContext } from "src/app/Emprendedor/contexts/EmprendedorContext";
import { messageAlert } from "src/app/Shared/utils/messageAlerts";
import { useFetch } from "src/app/Shared/services/hooks/useFetch";
import {
  SINAPSIS_APP_FORMATO_FECHA,
  SINAPSIS_APP_FORMATO_FECHA_INPUT,
} from "src/app/Shared/utils/constants";

function PrimeraAtencionPage() {
  const navigate = useNavigate();
  const { userData /*,loading*/ } = useContext(EmprendedorContext);

  const [step, setStep] = useState(1);
  const [datos, setDatos] = useState({});
  const [loading, setLoading] = useState(false);

  // Custom Hooks
  const {
    data: dataAPI,
    message: messageAPI,
    error: errorAPI,
    fetchAPI,
  } = useFetch();

  function nextStep() {
    setStep(step + 1);
  }
  function prevStep() {
    setStep(step - 1);
  }

  const handleChange = (event) => {
    if (!("target" in event)) {
      setDatos({ ...datos, descubrioSinapsis: event });
      return;
    }

    if (event.target.name === "cursosEmprendimiento") {
      const arrTmp = datos.cursosEmprendimiento
        ? [...datos.cursosEmprendimiento]
        : [];
      const index = arrTmp.indexOf(event.target.value);

      if (index !== -1) {
        arrTmp.splice(index, 1);
      } else {
        if (event.target.checked) {
          arrTmp.push(event.target.value);
        }
      }
      setDatos({ ...datos, [event.target.name]: arrTmp });
      return;
    }

    setDatos({
      ...datos,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = () => {
    const form = new FormData();

    for (let index = 0; index < Object.values(datos).length; index++) {
      if (
        Object.values(datos)[index] != null ||
        Object.values(datos)[index] != undefined
      ) {
        if (
          Object.keys(datos)[index] == "logoEmpresa" ||
          Object.keys(datos)[index] == "files"
        ) {
          if (Object.keys(datos)[index] == "files") {
            form.append("fotoPerfil", Object.values(datos)[index][0]);
          } else {
            form.append(
              Object.keys(datos)[index],
              Object.values(datos)[index][0]
            );
          }
        } else if (Object.keys(datos)[index] == "municipioId") {
          form.append("municipio", Object.values(datos)[index]);
        } else if (Object.keys(datos)[index] == "cursosEmprendimiento") {
          if (Object.values(datos)[index].length > 0) {
            form.append(
              "cursosEmprendimiento",
              Object.values(datos)[index].toString()
            );
          }
        } else if (Object.keys(datos)[index] == "descubrioSinapsis") {
          let metodosDescubrio = "";

          Object.values(datos)[index].forEach((metodoDescubrio) => {
            metodosDescubrio += `${metodoDescubrio.value},`;
          });

          if (metodosDescubrio.length > 0) {
            metodosDescubrio.slice(0, metodosDescubrio.length - 1);
          }

          form.append("descubrioSinapsis", metodosDescubrio);
        } else if (Object.keys(datos)[index] == "fechaNacimiento") {
          const fechaNacimiento = moment(
            Object.values(datos)[index],
            SINAPSIS_APP_FORMATO_FECHA_INPUT
          ).format(SINAPSIS_APP_FORMATO_FECHA);

          form.append("fechaNacimiento", fechaNacimiento);
        } else if (Object.keys(datos)[index] == "fechaConstitucion") {
          const fechaConstitucion = moment(
            Object.values(datos)[index],
            SINAPSIS_APP_FORMATO_FECHA_INPUT
          ).format(SINAPSIS_APP_FORMATO_FECHA);

          form.append("fechaConstitucion", fechaConstitucion);
        } else if (Object.keys(datos)[index] == "desdeFechaEjecucion") {
          const desdeFechaEjecucion = moment(
            Object.values(datos)[index],
            SINAPSIS_APP_FORMATO_FECHA_INPUT
          ).format(SINAPSIS_APP_FORMATO_FECHA);

          form.append("desdeFechaEjecucion", desdeFechaEjecucion);
        } else {
          form.append(Object.keys(datos)[index], Object.values(datos)[index]);
        }
      }
    }

    setLoading(true);
    fetchAPI({
      URL: URL_REGISTRAR_PRIMERA_ATENCION,
      requestOptions: {
        method: HTTP_METHOD_POST,
        data: form,
      },
    });
  };

  const getFotoPerfilFile = (fotoPerfil) => {
    setDatos({
      ...datos,
      fotoPerfil,
    });
  };

  const getLogoEmpresa = (logoEmpresa) => {
    setDatos({
      ...datos,
      logoEmpresa,
    });
  };

  const getFileDiagnostico = (fileDiagnostico) => {
    setDatos({
      ...datos,
      fileDiagnostico,
    });
  };

  // if (loading) {
  //   return <>LOADING PRIMERA_ATENCION_PAGE</>;
  // }

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
      messageAlert({
        title: "Primera atención enviada correctamente",
        text: "Ahora debes esperar a que un administrador te asigne tu ruta de emprendimiento y un mentor para seguirte guiando dentro de SINAPSIS UAO",
        icon: "success",
        confirmButtonText: "Aceptar",
        onConfirm: () => navigate("/Emprendedor"),
      });
    } else {
      messageAlert({
        title: "Registro de primera atención fallida",
        text: messageAPI,
        icon: "warning",
        confirmButtonText: "Aceptar",
      });
    }
    setLoading(false);
  }

  return (
    <div className="mb-5">
      {step === 1 ? (
        <InfoUsuario
          userData={userData}
          nextStep={nextStep}
          handleChange={handleChange}
          getFotoPerfilFile={getFotoPerfilFile}
          datos={datos}
          setDatos={setDatos}
        />
      ) : step === 2 ? (
        <InfoEmprendimiento
          nextStep={nextStep}
          prevStep={prevStep}
          handleChange={handleChange}
          getLogoEmpresa={getLogoEmpresa}
          datos={datos}
        />
      ) : step === 3 ? (
        <InfoPrimeraAtencion
          nextStep={nextStep}
          prevStep={prevStep}
          handleChange={handleChange}
          datos={datos}
        />
      ) : step === 4 ? (
        <InfoDiagnostico
          nextStep={nextStep}
          prevStep={prevStep}
          handleChange={handleChange}
          getFileDiagnostico={getFileDiagnostico}
          datos={datos}
        />
      ) : (
        <Confirmacion
          prevStep={prevStep}
          handleChange={handleChange}
          datos={datos}
          enviarDatos={handleSubmit}
        />
      )}
    </div>
  );
}

export default PrimeraAtencionPage;
