import { useState } from "react";
import {
  Button,
  Col,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Row,
} from "react-bootstrap";
import {
  Boton,
  BotonSiguiente,
} from "src/assets/styles/emprendedor/primeraAtencion.style";
import { SubTitulo } from "src/assets/styles/emprendedor/rutaEmprendimiento.style";
import { useFetch } from "src/services/hooks/useFetch";
import {
  messageAlert,
  messageAlertWithoutText,
} from "src/utils/alerts/MessageAlert";
import {
  HTTP_METHOD_POST,
  URL_ACTUALIZAR_HORARIO_MENTOR,
} from "src/utils/apiConstants";
import {
  SINAPSIS_APP_DIA_SEMANA_LUNES,
  SINAPSIS_APP_DIA_SEMANA_MARTES,
  SINAPSIS_APP_DIA_SEMANA_MIERCOLES,
  SINAPSIS_APP_DIA_SEMANA_JUEVES,
  SINAPSIS_APP_DIA_SEMANA_VIERNES,
  SINAPSIS_APP_DIA_SEMANA_SABADO,
} from "src/utils/constants";
import { obtenerDiaSemana } from "src/utils/functions";

function EditarDisponibilidadModal({ show, setShow, horarios = [] }) {
  const [selectedDay, setSelectedDay] = useState(SINAPSIS_APP_DIA_SEMANA_LUNES);
  const [horarioNuevo, setHorarioNuevo] = useState(
    JSON.parse(JSON.stringify(horarios))
  );

  // Custom Hooks
  const { message, error, fetchAPI } = useFetch();

  const onDeleteHorarioFromDay = (indexHorarioDay) => {
    setHorarioNuevo({
      ...horarioNuevo,
      [horarioNuevo[selectedDay]]: horarioNuevo[selectedDay].splice(
        indexHorarioDay,
        1
      ),
    });
  };

  const onAddHorarioFromDay = () => {
    if (horarioNuevo[selectedDay] == null) {
      horarioNuevo[selectedDay] = [];
    }

    horarioNuevo[selectedDay].push({
      id: horarioNuevo[selectedDay].length + 1,
      dia: obtenerDiaSemana(selectedDay),
    });

    setHorarioNuevo({ ...horarioNuevo });
  };

  const onChangeHorarioFromDay = (event, index) => {
    if (index != null) {
      const newHorario = {
        ...horarioNuevo[selectedDay][index],
        [event.target.name.split("-")[0]]: event.target.value,
      };

      horarioNuevo[selectedDay][index] = newHorario;

      setHorarioNuevo({
        ...horarioNuevo,
      });
    } else {
      // Push to horarioNuevo[selectedDay]
      if (horarioNuevo[selectedDay] == null) {
        horarioNuevo[selectedDay] = [];
      }

      horarioNuevo[selectedDay].push({
        [event.target.name.split("-")[0]]: event.target.value,
      });
      setHorarioNuevo({ ...horarioNuevo });
    }
  };

  const onHandleCloseModal = () => {
    setHorarioNuevo(horarios);
    setShow();
  };

  const onSubmitDisponibilidad = (e) => {
    e.preventDefault();

    fetchAPI({
      URL: URL_ACTUALIZAR_HORARIO_MENTOR,
      requestOptions: {
        method: HTTP_METHOD_POST,
        data: {
          idMentor: 2,
          horarioMentor: horarioNuevo,
        },
      },
    });

    if (error) {
      messageAlert({
        title: "Algo ha fallado",
        text: error,
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }

    if (message) {
      if (message == "OK") {
        messageAlertWithoutText({
          title: "Actualización Correcta!",
          text: "Se ha actualizado el horario correctamente",
          icon: "info",
          confirmButtonText: "Aceptar",
        });
        onHandleCloseModal();
      } else {
        messageAlertWithoutText({
          title: "No se encontraron resultados",
          icon: "info",
          confirmButtonText: "Aceptar",
        });
      }
    }

    messageAlertWithoutText({
      title: "Actualización Correcta!",
      text: "Se ha actualizado el horario correctamente",
      icon: "info",
      confirmButtonText: "Aceptar",
    }).then(() => onHandleCloseModal());
  };

  return (
    <Modal
      show={show}
      id="modal_editar_disponibilidad"
      style={{ padding: "1rem" }}
      size="lg"
    >
      <ModalHeader className="modalHeader">
        <ModalTitle>
          <SubTitulo>Editar Disponibilidad</SubTitulo>
        </ModalTitle>
      </ModalHeader>
      <ModalBody className="modalBody">
        <Container>
          <form encType="multipart/form-data">
            <Row className="mb-3">
              <Col md={2}>
                <button
                  type="button"
                  className="btn btn-info"
                  onClick={() => setSelectedDay(SINAPSIS_APP_DIA_SEMANA_LUNES)}
                >
                  Lunes
                </button>
              </Col>
              <Col md={2}>
                <button
                  type="button"
                  className="btn btn-info"
                  onClick={() => setSelectedDay(SINAPSIS_APP_DIA_SEMANA_MARTES)}
                >
                  Martes
                </button>
              </Col>
              <Col md={2}>
                <button
                  type="button"
                  className="btn btn-info"
                  onClick={() =>
                    setSelectedDay(SINAPSIS_APP_DIA_SEMANA_MIERCOLES)
                  }
                >
                  Miércoles
                </button>
              </Col>
              <Col md={2}>
                <button
                  type="button"
                  className="btn btn-info"
                  onClick={() => setSelectedDay(SINAPSIS_APP_DIA_SEMANA_JUEVES)}
                >
                  Jueves
                </button>
              </Col>
              <Col md={2}>
                <button
                  type="button"
                  className="btn btn-info"
                  onClick={() =>
                    setSelectedDay(SINAPSIS_APP_DIA_SEMANA_VIERNES)
                  }
                >
                  Viernes
                </button>
              </Col>
              <Col md={2}>
                <button
                  type="button"
                  className="btn btn-info"
                  onClick={() => setSelectedDay(SINAPSIS_APP_DIA_SEMANA_SABADO)}
                >
                  Sábado
                </button>
              </Col>
            </Row>

            {horarioNuevo[selectedDay] &&
            horarioNuevo[selectedDay].length > 0 ? (
              <>
                {horarioNuevo[selectedDay].map((horarioDia, index) => {
                  return (
                    <Row className="mb-3" key={index}>
                      <Col md={5}>
                        <label className="form-label">Hora de inicio</label>
                        <br />
                        <input
                          type="time"
                          className="form-control"
                          name={`horaInicio-${index}`}
                          value={horarioDia?.horaInicio?.split(" ")[0]}
                          onChange={(evt) => onChangeHorarioFromDay(evt, index)}
                        />
                      </Col>
                      <Col md={5}>
                        <label className="form-label">Hora de fin</label>
                        <br />
                        <input
                          type="time"
                          className="form-control"
                          name={`horaFin-${index}`}
                          value={horarioDia?.horaFin?.split(" ")[0]}
                          onChange={(evt) => onChangeHorarioFromDay(evt, index)}
                        />
                      </Col>
                      <Col
                        md={2}
                        className="d-flex flex-column justify-content-center"
                      >
                        <button
                          type="button"
                          className="btn btn-secondary my-1"
                          onClick={() => onDeleteHorarioFromDay(index)}
                        >
                          DEL
                        </button>
                        {index === horarioNuevo[selectedDay].length - 1 && (
                          <button
                            type="button"
                            className="btn btn-primary my-1"
                            onClick={() => onAddHorarioFromDay()}
                          >
                            ADD
                          </button>
                        )}
                      </Col>
                    </Row>
                  );
                })}
              </>
            ) : (
              <Row className="mb-3">
                <Col md={5}>
                  <label className="form-label">Hora de inicio</label>
                  <br />
                  <input
                    type="time"
                    className="form-control"
                    name={`horaInicio-0`}
                    onChange={onChangeHorarioFromDay}
                  />
                </Col>
                <Col md={5}>
                  <label className="form-label">Hora de fin</label>
                  <br />
                  <input
                    type="time"
                    className="form-control"
                    name={`horaFin-0`}
                    onChange={onChangeHorarioFromDay}
                  />
                </Col>
                <Col
                  md={2}
                  className="d-flex flex-column justify-content-center"
                >
                  <button
                    type="button"
                    className="btn btn-primary my-1"
                    onClick={() => onAddHorarioFromDay()}
                  >
                    ADD
                  </button>
                </Col>
              </Row>
            )}
          </form>
        </Container>
      </ModalBody>
      <ModalFooter className="modalFooter_revisarConsultoria">
        <Button onClick={onSubmitDisponibilidad} className="btn btn-primary">
          Actualizar disponibilidad
        </Button>

        <Button className="btn btn-secondary" onClick={onHandleCloseModal}>
          Cerrar
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default EditarDisponibilidadModal;
