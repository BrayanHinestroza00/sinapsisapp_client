import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";

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
} from "src/app/Shared/utils/apiConstants";
import { Card } from "src/app/Shared/assets/styles/Common";
import { SINAPSIS_APP_ESTADO_RUTA_EMPRENDIMIENTO_PENDIENTE_APROBAR } from "src/app/Shared/utils/constants";

function HomePage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { userData, selectedProjectIndex } = useContext(EmprendedorContext);

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
      fetchAPI({
        URL: "http://localhost:5000/api/v1/emprendedor/avance_ruta",
        requestOptions: {
          method: HTTP_METHOD_GET,
          params: {
            idProyectoEmprendimiento:
              userData.proyectosEmprendimiento[selectedProjectIndex]
                .idProyectoEmprendimiento,
          },
        },
      });
    }
  }, [selectedProjectIndex, state?.reload]);

  const onIniciarEtapaSonar = (tipo, lastActivity) => {
    if (tipo == 0) {
      // Iniciar
      axios({
        url: "http://localhost:5000/api/v1/emprendedor/avance_ruta/iniciar",
        method: HTTP_METHOD_POST,
        data: {
          idRutaProyecto: dataAPI?.rutaProyectoEmprendimiento.id,
          idSubActividadRuta: 1,
        },
      }).then(() => {
        navigate("/Emprendedor/Ruta/Avanzar/Soñar", {
          state: lastActivity,
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
        url: "http://localhost:5000/api/v1/emprendedor/avance_ruta/iniciar",
        method: HTTP_METHOD_POST,
        data: {
          idRutaProyecto: dataAPI?.rutaProyectoEmprendimiento.id,
          idSubActividadRuta: 6,
        },
      }).then(() => {
        navigate("/Emprendedor/Ruta/Avanzar/Pensar", {
          state: lastActivity,
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
        url: "http://localhost:5000/api/v1/emprendedor/avance_ruta/iniciar",
        method: HTTP_METHOD_POST,
        data: {
          idRutaProyecto: dataAPI?.rutaProyectoEmprendimiento.id,
          idSubActividadRuta: 9,
        },
      }).then(() => {
        navigate("/Emprendedor/Ruta/Avanzar/Testear", {
          state: lastActivity,
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
        url: "http://localhost:5000/api/v1/emprendedor/avance_ruta/iniciar",
        method: HTTP_METHOD_POST,
        data: {
          idRutaProyecto: dataAPI?.rutaProyectoEmprendimiento.id,
          idSubActividadRuta: 15,
        },
      }).then(() => {
        navigate("/Emprendedor/Ruta/Avanzar/Arrancar", {
          state: lastActivity,
        });
      });
    } else {
      navigate("/Emprendedor/Ruta/Avanzar/Arrancar", {
        state: lastActivity,
      });
    }
  };

  console.log("first", dataAPI);

  return loadingAPI || selectedProjectIndex == null ? (
    <>
      <Card>
        <LoadingSpinner width={"10rem"} height={"10rem"} />
      </Card>
    </>
  ) : dataAPI?.rutaProyectoEmprendimiento.idEtapa == 1 ? (
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
