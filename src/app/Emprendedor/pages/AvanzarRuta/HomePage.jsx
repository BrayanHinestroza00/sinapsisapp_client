import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import EtapaSonar from "../../components/Ruta/AvanzarRuta/Common/etapa_ruta/Sonar";
import EtapaPensar from "../../components/Ruta/AvanzarRuta/Common/etapa_ruta/Pensar";
import EtapaTestear from "../../components/Ruta/AvanzarRuta/Common/etapa_ruta/Testear";
import EtapaArrancar from "../../components/Ruta/AvanzarRuta/Common/etapa_ruta/Arrancar";
import LoadingSpinner from "src/app/Shared/components/LoadingSpinner/LoadingSpinner";

import { EmprendedorContext } from "../../contexts/EmprendedorContext";
import { useFetch } from "src/app/Shared/services/hooks/useFetch";
import {
  HTTP_METHOD_GET,
  HTTP_METHOD_POST,
  URL_INICIAR_AVANCE_RUTA,
  URL_OBTENER_AVANCE_RUTA,
} from "src/app/Shared/utils/apiConstants";
import { Card } from "src/app/Shared/assets/styles/Common";
import { SINAPSIS_APP_ESTADO_RUTA_EMPRENDIMIENTO_PENDIENTE_APROBAR } from "src/app/Shared/utils/constants";
import Welcome from "../../components/Ruta/AvanzarRuta/Welcome";

function HomePage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { userData, selectedProjectIndex } = useContext(EmprendedorContext);

  const [showModal, setShowModal] = useState({ show: null });

  // Custom Hooks
  const {
    data: dataAPI,
    message: messageAPI,
    error: errorAPI,
    loading: loadingAPI,
    fetchAPI,
  } = useFetch();

  useEffect(() => {
    if (selectedProjectIndex != null || state?.reload == true) {
      refrescarDatos();
    }
  }, [selectedProjectIndex, state?.reload]);

  useEffect(() => {
    if (dataAPI) {
      const isFirstTime =
        dataAPI.rutaProyectoEmprendimiento.idEtapa == 1 &&
        !(dataAPI.subActividadRutaEmp.length > 0);
      setShowModal({ show: isFirstTime });
    }
  }, [dataAPI]);

  const refrescarDatos = async () => {
    await fetchAPI({
      URL: URL_OBTENER_AVANCE_RUTA,
      requestOptions: {
        method: HTTP_METHOD_GET,
        params: {
          idProyectoEmprendimiento:
            userData.proyectosEmprendimiento[selectedProjectIndex]
              .idProyectoEmprendimiento,
        },
      },
    });
  };

  const onIniciarEtapaSonar = (tipo, lastActivity) => {
    if (tipo == 0) {
      // Iniciar
      axios({
        url: URL_INICIAR_AVANCE_RUTA,
        method: HTTP_METHOD_POST,
        data: {
          idRutaProyecto: dataAPI?.rutaProyectoEmprendimiento.id,
          idSubActividadRuta: 1,
        },
      }).then(() => {
        axios({
          url: URL_OBTENER_AVANCE_RUTA,
          method: HTTP_METHOD_GET,
          params: {
            idProyectoEmprendimiento:
              userData.proyectosEmprendimiento[selectedProjectIndex]
                .idProyectoEmprendimiento,
          },
        })
          .then(({ data }) => {
            navigate("/Emprendedor/Ruta/Avanzar/Soñar", {
              state:
                data.response.subActividadRutaEmp.length > 0
                  ? data.response.subActividadRutaEmp[0]
                  : null,
            });
          })
          .catch((err) => {
            console.error(err);
          });
      });
    } else {
      navigate("/Emprendedor/Ruta/Avanzar/Soñar", {
        state: lastActivity,
      });
    }
  };

  const onIniciarEtapaPensar = (tipo, lastActivity) => {
    if (tipo == 0) {
      // Iniciar
      axios({
        url: URL_INICIAR_AVANCE_RUTA,
        method: HTTP_METHOD_POST,
        data: {
          idRutaProyecto: dataAPI?.rutaProyectoEmprendimiento.id,
          idSubActividadRuta: 6,
        },
      }).then(() => {
        axios({
          url: URL_OBTENER_AVANCE_RUTA,
          method: HTTP_METHOD_GET,
          params: {
            idProyectoEmprendimiento:
              userData.proyectosEmprendimiento[selectedProjectIndex]
                .idProyectoEmprendimiento,
          },
        })
          .then(({ data }) => {
            navigate("/Emprendedor/Ruta/Avanzar/Pensar", {
              state:
                data.response.subActividadRutaEmp.length > 0
                  ? data.response.subActividadRutaEmp[0]
                  : null,
            });
          })
          .catch((err) => {
            console.error(err);
          });
      });
    } else {
      navigate("/Emprendedor/Ruta/Avanzar/Pensar", {
        state: lastActivity,
      });
    }
  };

  const onIniciarEtapaTestear = (tipo, lastActivity) => {
    if (tipo == 0) {
      // Iniciar
      axios({
        url: URL_INICIAR_AVANCE_RUTA,
        method: HTTP_METHOD_POST,
        data: {
          idRutaProyecto: dataAPI?.rutaProyectoEmprendimiento.id,
          idSubActividadRuta: 10,
        },
      }).then(() => {
        axios({
          url: URL_OBTENER_AVANCE_RUTA,
          method: HTTP_METHOD_GET,
          params: {
            idProyectoEmprendimiento:
              userData.proyectosEmprendimiento[selectedProjectIndex]
                .idProyectoEmprendimiento,
          },
        })
          .then(({ data }) => {
            navigate("/Emprendedor/Ruta/Avanzar/Testear", {
              state:
                data.response.subActividadRutaEmp.length > 0
                  ? data.response.subActividadRutaEmp[0]
                  : null,
            });
          })
          .catch((err) => {
            console.error(err);
          });
      });
    } else {
      navigate("/Emprendedor/Ruta/Avanzar/Testear", {
        state: lastActivity,
      });
    }
  };

  const onIniciarEtapaArrancar = (tipo, lastActivity) => {
    if (tipo == 0) {
      // Iniciar
      axios({
        url: URL_INICIAR_AVANCE_RUTA,
        method: HTTP_METHOD_POST,
        data: {
          idRutaProyecto: dataAPI?.rutaProyectoEmprendimiento.id,
          idSubActividadRuta: 16,
        },
      }).then(() => {
        axios({
          url: URL_OBTENER_AVANCE_RUTA,
          method: HTTP_METHOD_GET,
          params: {
            idProyectoEmprendimiento:
              userData.proyectosEmprendimiento[selectedProjectIndex]
                .idProyectoEmprendimiento,
          },
        })
          .then(({ data }) => {
            navigate("/Emprendedor/Ruta/Avanzar/Arrancar", {
              state:
                data.response.subActividadRutaEmp.length > 0
                  ? data.response.subActividadRutaEmp[0]
                  : null,
            });
          })
          .catch((err) => {
            console.error(err);
          });
      });
    } else {
      navigate("/Emprendedor/Ruta/Avanzar/Arrancar", {
        state: lastActivity,
      });
    }
  };

  const onClicHideWelcome = () => {
    setShowModal({ show: false });
  };

  return loadingAPI || selectedProjectIndex == null ? (
    <>
      <Card>
        <LoadingSpinner width={"10rem"} height={"10rem"} />
      </Card>
    </>
  ) : dataAPI?.rutaProyectoEmprendimiento.idEtapa == 1 ? (
    <>
      <>
        {!(dataAPI.subActividadRutaEmp.length > 0) && (
          <Welcome show={showModal.show} onHide={onClicHideWelcome} />
        )}
      </>

      <EtapaSonar
        showButton={true}
        stateButton={
          dataAPI?.rutaProyectoEmprendimiento.estadoRuta ==
          SINAPSIS_APP_ESTADO_RUTA_EMPRENDIMIENTO_PENDIENTE_APROBAR
            ? 1
            : dataAPI.subActividadRutaEmp.length > 0
            ? 2
            : 0
        }
        lastActivity={
          dataAPI.subActividadRutaEmp.length > 0
            ? dataAPI.subActividadRutaEmp[0]
            : null
        }
        onIniciar={onIniciarEtapaSonar}
      />
    </>
  ) : dataAPI?.rutaProyectoEmprendimiento.idEtapa == 2 ? (
    <EtapaPensar
      showButton={true}
      stateButton={
        dataAPI?.rutaProyectoEmprendimiento.estadoRuta ==
        SINAPSIS_APP_ESTADO_RUTA_EMPRENDIMIENTO_PENDIENTE_APROBAR
          ? 1
          : dataAPI.subActividadRutaEmp.length > 0
          ? 2
          : 0
      }
      lastActivity={
        dataAPI.subActividadRutaEmp.length > 0
          ? dataAPI.subActividadRutaEmp[0]
          : null
      }
      onIniciar={onIniciarEtapaPensar}
    />
  ) : dataAPI?.rutaProyectoEmprendimiento.idEtapa == 3 ? (
    <EtapaTestear
      showButton={true}
      stateButton={
        dataAPI?.rutaProyectoEmprendimiento.estadoRuta ==
        SINAPSIS_APP_ESTADO_RUTA_EMPRENDIMIENTO_PENDIENTE_APROBAR
          ? 1
          : dataAPI.subActividadRutaEmp.length > 0
          ? 2
          : 0
      }
      lastActivity={
        dataAPI.subActividadRutaEmp.length > 0
          ? dataAPI.subActividadRutaEmp[0]
          : null
      }
      onIniciar={onIniciarEtapaTestear}
    />
  ) : dataAPI?.rutaProyectoEmprendimiento.idEtapa == 4 ? (
    <EtapaArrancar
      showButton={true}
      stateButton={
        dataAPI?.rutaProyectoEmprendimiento.estadoRuta ==
        SINAPSIS_APP_ESTADO_RUTA_EMPRENDIMIENTO_PENDIENTE_APROBAR
          ? 1
          : dataAPI.subActividadRutaEmp.length > 0
          ? 2
          : 0
      }
      lastActivity={
        dataAPI.subActividadRutaEmp.length > 0
          ? dataAPI.subActividadRutaEmp[0]
          : null
      }
      onIniciar={onIniciarEtapaArrancar}
    />
  ) : (
    <></>
  );
}

export default HomePage;
