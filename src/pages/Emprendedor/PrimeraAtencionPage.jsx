import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

import EmprendedorLayout from "src/layouts/EmprendedorLayout";
import InfoEmprendimiento from "src/components/emprendedor/primera_atencion/InfoEmprendimiento";
import Confirmacion from "src/components/emprendedor/primera_atencion/Confirmacion";
import InfoUsuario from "src/components/emprendedor/primera_atencion/InfoUsuario";
import { HOST } from "src/utils/constants";

function PrimeraAtencionPage() {
  const [step, setStep] = useState(1);
  const [datos, setDatos] = useState({});

  function nextStep() {
    setStep(step + 1);
  }
  function prevStep() {
    setStep(step - 1);
  }

  const handleChange = (event) => {
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
          form.append(Object.keys(datos)[index], Object.values(datos)[index]);
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

  return (
    <EmprendedorLayout sidebar={false}>
      <>
        {step === 1 ? (
          <InfoUsuario
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
        ) : (
          <Confirmacion
            prevStep={prevStep}
            handleChange={handleChange}
            datos={datos}
            enviarDatos={handleSubmit}
          />
        )}
      </>
    </EmprendedorLayout>
  );
}

export default PrimeraAtencionPage;
