import React, { useState } from "react";
import Axios from "axios";
import swal from "sweetalert2";

import CrearTarea from "./CrearTarea";
import RevisarTarea from "./RevisarTarea";
import FlexyTable from "src/components/FlexyTable";

import { HOST } from "src/utils/constants";
import { useAPI_GET } from "src/services/hooks/useAPI";
import { Boton } from "src/assets/styles/emprendedor/primeraAtencion.style";

// import "../../../styles/TareasMentor.css";

function Tareas({ cedula, nombre }) {
  const [crearTarea, setCrearTarea] = useState(false);
  const [revisarTarea, setRevisarTarea] = useState(false);
  const [idTarea, setIdTarea] = useState(null);

  // const [loadingEntregadas, data, errorEntregadas] = useAPI_GET(
  //   `/Mentor/Tareas/Entregadas`,
  //   {
  //     headers: {
  //       Authorization:
  //         localStorage.getItem("token") || sessionStorage.getItem("token"),
  //     },
  //     params: {
  //       cedulaEmprendedor: cedula,
  //     },
  //   }
  // );

  // const [loadingPendientes, dataPendiente, errorPendientes] = useAPI_GET(
  //   `/Mentor/Tareas/Pendientes`,
  //   {
  //     headers: {
  //       Authorization:
  //         localStorage.getItem("token") || sessionStorage.getItem("token"),
  //     },
  //     params: {
  //       cedulaEmprendedor: cedula,
  //     },
  //   }
  // );

  function RevisarT({ idTarea }) {
    setIdTarea(idTarea);
    mostrarRevisarT();
  }
  function EliminarT({ idTarea }) {
    swal
      .fire({
        title: "¿Estás seguro que deseas eliminar la tarea?",
        icon: "warning",
        iconColor: "#9a66a8",
        confirmButtonText: "Eliminar",
        confirmButtonColor: "#9a66a8",
        showConfirmButton: true,
        showCancelButton: true,
        cancelButtonText: "Cancelar",
      })
      .then((respuesta) => {
        if (respuesta.isConfirmed) {
          Axios.delete(`${HOST}/Mentor/Tarea`, {
            headers: {
              Authorization:
                localStorage.getItem("token") ||
                sessionStorage.getItem("token"),
            },
            data: {
              idTarea,
            },
          })
            .then(() => {
              swal
                .fire({
                  title: "Eliminación exitosa",
                  icon: "success",
                  iconColor: "#9a66a8",
                  confirmButtonText: "Aceptar",
                  confirmButtonColor: "#9a66a8",
                  showConfirmButton: true,
                })
                .then(() => (window.location.href = window.location.pathname));
            })
            .catch((err) => console.log(err.response));
        }
      });
  }
  /**Funciones que muestras u ocultan los modal */
  function ocultarModal() {
    setCrearTarea(false);
    setRevisarTarea(false);
  }
  function mostrarCrearT() {
    setCrearTarea(true);
  }
  function mostrarRevisarT() {
    setRevisarTarea(true);
  }
  /*---------------------------------------------------------------*/

  // if (loadingEntregadas || loadingPendientes) {
  //   return <div>Cargando</div>;
  // }

  // if (errorEntregadas || errorPendientes) {
  //   swal.fire({
  //     title:
  //       errorEntregadas.response.data.message ||
  //       errorPendientes.response.data.message,
  //     icon: "warning",
  //     confirmButtonText: "Aceptar",
  //     confirmButtonColor: "#9a66a8",
  //     showConfirmButton: true,
  //     showCloseButton: true,
  //   });
  // }

  return (
    <div className="contenedor_tareas_mentor">
      <Boton className="btn btn-primary" onClick={mostrarCrearT}>
        Crear tarea
      </Boton>

      {data ? (
        <FlexyTable
          titulo={"tareas entregadas por " + nombre}
          datos={data}
          btn1="Revisar"
          fun1={RevisarT}
          add={true}
        />
      ) : (
        <div className="container">
          <div className="card card-body text-center">
            <h3>No hay tareas entregadas por el emprendedor.</h3>
          </div>
        </div>
      )}

      <hr className="mt-5 mb-5" />

      {dataPendiente ? (
        <>
          <FlexyTable
            titulo={"tareas pendientes de " + nombre}
            datos={dataPendiente}
            btn1="Eliminar"
            fun1={EliminarT}
            add={true}
          />
        </>
      ) : (
        <div className="container mt-5 mb-5">
          <div className="card card-body text-center">
            <h3>No hay tareas pendientes del emprendedor.</h3>
          </div>
        </div>
      )}

      {crearTarea ? (
        <CrearTarea show={crearTarea} setShow={ocultarModal} />
      ) : revisarTarea ? (
        <RevisarTarea
          show={revisarTarea}
          setShow={ocultarModal}
          idTarea={idTarea}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

const data = [
  {
    ID: "1",
    "Tipo Doc.": "CC",
    "Num Doc.": "1005943951",
    Nombre: "Brayan Hinestroza",
    Correo: "123@gmail.com",
  },
];

const dataPendiente = [
  {
    ID: "1",
    "Tipo Doc.": "CC",
    "Num Doc.": "1005943951",
    Nombre: "Brayan Hinestroza",
    Correo: "123@gmail.com",
  },
];

export default Tareas;
