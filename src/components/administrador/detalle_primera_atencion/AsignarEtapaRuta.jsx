import React, { useEffect, useState } from "react";
import Axios from "axios";
import swal from "sweetalert2";
import { Titulo } from "src/assets/styles/emprendedor/rutaEmprendimiento.style";
import { Card } from "react-bootstrap";
import {
  HTTP_METHOD_GET,
  URL_OBTENER_ETAPAS_RUTA_INNOVACION_EMPRENDIMIENTO,
  URL_OBTENER_MENTORES,
} from "src/utils/apiConstants";
import { useFetch } from "src/services/hooks/useFetch";

function AsignarEtapaRuta(props) {
  const [mentores2, setMentores] = useState(null);
  const [etapas2, setEtapas] = useState(null);
  const [etapaMentor, setEtapaMentor] = useState({}); // Eleccion del administrador para dar ruta y mentor al emprendedor
  const loading = props.loading;
  const mentores = [];

  // Custom Hooks
  const {
    data: mentoresData,
    message: mentoresMessage,
    error: mentoresError,
    loading: mentoresLoading,
    fetchAPI: fetchApiMentores,
  } = useFetch();

  const {
    data: etapasRutaData,
    message: etapasRutaMessage,
    error: etapasRutaError,
    loading: etapasRutaLoading,
    fetchAPI: fetchApiEtapasRuta,
  } = useFetch();

  useEffect(() => {
    fetchApiEtapasRuta({
      URL: URL_OBTENER_ETAPAS_RUTA_INNOVACION_EMPRENDIMIENTO,
      requestOptions: {
        method: HTTP_METHOD_GET,
      },
    });
  }, []);

  useEffect(() => {
    if (etapaMentor.etapa) {
      fetchApiMentores({
        URL: URL_OBTENER_MENTORES,
        requestOptions: {
          method: HTTP_METHOD_GET,
          params: {
            idEtapaRutaInnovacion: etapaMentor.etapa,
          },
        },
      });
    }
  }, [etapaMentor]);

  useEffect(() => {
    if (loading) {
      Axios.get(`${URL}/Administrador/AsignarMentor`, {
        headers: {
          Authorization:
            localStorage.getItem("token") || sessionStorage.getItem("token"),
        },
      })
        .then((res) => {
          const { etapas, mentores } = res.data;
          setMentores(mentores);
          setEtapas(etapas);
          props.setLoading(false);
        })
        .catch((err) => {
          swal.fire({
            title: err.response.data.message,
            icon: "warning",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#9a66a8",
            showConfirmButton: true,
            showCloseButton: true,
          });
        });
    }
  }, [loading]);

  const HandleChange = (e) => {
    if (e.target.name == "etapa") {
      setEtapaMentor({
        [e.target.name]: e.target.value,
      });
    } else {
      setEtapaMentor({
        ...etapaMentor,
        [e.target.name]: e.target.value,
      });
    }
  };

  const HandleClick = () => {
    swal
      .fire({
        title: "¿Estás seguro?",
        text: "Se asignara una etapa inicial y mentor principal al emprendedor",
        icon: "warning",
        iconColor: "#9a66a8",
        confirmButtonText: "Confirmar",
        confirmButtonColor: "#9a66a8",
        showConfirmButton: true,
        showCancelButton: true,
        cancelButtonText: "Cancelar",
      })
      .then((res) => {
        if (res.isConfirmed) {
          asignarRuta();
        }
      });
  };

  const asignarRuta = () => {
    const datos = {
      ...etapaMentor,
      cedulaEmprendedor: window.location.pathname.split("/")[3],
    };
    Axios.put(
      `${URL}/Administrador/AsignarMentor`,
      {
        datos,
      },
      {
        headers: {
          Authorization:
            localStorage.getItem("token") || sessionStorage.getItem("token"),
        },
      }
    )
      .then((res) => {
        if (
          res.data.resultado1.affectedRows > 0 &&
          res.data.resultado2.affectedRows > 0
        ) {
          swal
            .fire({
              title: "Diagnostico revisado",
              icon: "success",
              iconColor: "#9a66a8",
              confirmButtonText: "Aceptar",
              confirmButtonColor: "#9a66a8",
              showConfirmButton: true,
            })
            .then(() => (window.location.href = "/Administrador/Diagnosticos"));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (/*loading ||*/ !etapasRutaData) {
    return <h1>LOADING ProyectoEmprendimientosPage</h1>;
  }

  if (etapasRutaMessage) {
    return (
      <>
        <p>{etapasRutaMessage}</p>
      </>
    );
  }

  if (etapasRutaError) {
    return (
      <>
        <h1>ERROR</h1>
        <p>{etapasRutaError}</p>
      </>
    );
  }

  return (
    <Card className="px-1 mx-1">
      <div className="container">
        <Titulo className="text-center">
          Asignar etapa inicial y mentor principal
        </Titulo>
        <form>
          <div className="mb-3">
            <label className="form-label">Etapa inicial</label>
            <br></br>
            <select
              name="etapa"
              className="form-select"
              type="text"
              onChange={(e) => {
                HandleChange(e);
              }}
            >
              <option className="inputDiag" value="-1" disabled selected>
                Seleccione una...
              </option>
              {etapasRutaLoading || etapasRutaData.length == 0 ? (
                <></>
              ) : (
                etapasRutaData.map((etapaRuta) => (
                  <option className="inputDiagDC" value={etapaRuta.id}>
                    {etapaRuta.nombre}
                  </option>
                ))
              )}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Mentor principal</label>
            <br></br>
            <select
              name="mentorPrincipal"
              className="form-select"
              type="text"
              onChange={(e) => {
                HandleChange(e);
              }}
              value={etapaMentor.mentorPrincipal || "-1"}
            >
              <option className="inputDiagDC" value="-1" disabled selected>
                Seleccione uno...
              </option>
              {mentoresData && mentoresData.length > 0 ? (
                mentoresData.map((mentor) => (
                  <option className="inputDiagDC" value={mentor.idUsuario}>
                    {`${mentor.usuario.nombres} ${mentor.usuario.apellidos} / ${
                      mentor.cargo || "Sin especialidad"
                    }`}
                  </option>
                ))
              ) : (
                <></>
              )}
            </select>
          </div>
          <div className="text-center">
            <button className="btn btn-primary mb-3" onClick={HandleClick}>
              Asignar
            </button>
          </div>
        </form>
      </div>
    </Card>
  );
}

export default AsignarEtapaRuta;
