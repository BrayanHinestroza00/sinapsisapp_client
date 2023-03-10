import { useContext, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

import InfoEmprendimiento from "src/components/emprendedor/primera_atencion/InfoEmprendimiento";
import Confirmacion from "src/components/emprendedor/primera_atencion/Confirmacion";
import InfoUsuario from "src/components/emprendedor/primera_atencion/InfoUsuario";
import { HOST } from "src/utils/constants";
import InfoPrimeraAtencion from "src/components/emprendedor/primera_atencion/InfoPrimeraAtencion";
import InfoDiagnostico from "src/components/emprendedor/primera_atencion/InfoDiagnostico";
import { EmprendedorContext } from "src/services/context/EmprendedorContext";

function PrimeraAtencionPage() {
  const {
    userData,
    selectedProjectValue: idSelectedProject,
    loading,
  } = useContext(EmprendedorContext);

  const [step, setStep] = useState(1);
  const [datos, setDatos] = useState({});

  function nextStep() {
    setStep(step + 1);
  }
  function prevStep() {
    setStep(step - 1);
  }

  const handleChange = (event) => {
    if (!("target" in event)) {
      console.log(event);
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
        } else {
          if (Object.keys(datos)[index] == "municipioId") {
            form.append("municipio", Object.values(datos)[index]);
          } else {
            form.append(Object.keys(datos)[index], Object.values(datos)[index]);
          }
        }
      }
    }

    axios
      .post(`${HOST}/emprendedor/primeraAtencion`, form)
      .then((res) => {
        console.log(res);
        Swal.fire({
          title: "Primera atención enviada correctamente",
          text: "Ahora debes esperar a que un administrador te asigne tu ruta de emprendimiento y un mentor para seguirte guiando dentro de Sinapsis",
          icon: "success",
          iconColor: "#9a66a8",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#9a66a8",
          showConfirmButton: true,
        }).then(() => (window.location.href = "/Emprendedor"));
      })
      .catch((err) => {
        Swal.fire({
          title: "Primera atención fallida",
          text: err.response.data.message,
          icon: "error",
          iconColor: "#9a66a8",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#9a66a8",
          showConfirmButton: true,
        });
      });
  };

  const getFotoPerfilFile = (files) => {
    setDatos({
      ...datos,
      files,
    });
  };

  const getLogoEmpresa = (files) => {
    setDatos({
      ...datos,
      logoEmpresa: files,
    });
  };

  const getFileDiagnostico = (files) => {
    setDatos({
      ...datos,
      fileDiagnostico: files,
    });
  };

  if (loading) {
    return <>LOADING PRIMERA_ATENCION_PAGE</>;
  }

  return (
    <div>
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
