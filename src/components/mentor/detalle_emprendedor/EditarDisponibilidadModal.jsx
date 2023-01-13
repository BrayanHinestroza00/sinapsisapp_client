import React, { useState } from "react";
import {
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

function EditarDisponibilidadModal({ show, setShow, horarios = [] }) {
  const [selectedDay, setSelectedDay] = useState("lunes");
  const [horarioNuevo, setHorarioNuevo] = useState(
    JSON.parse(JSON.stringify(horarios))
  );

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
    horarioNuevo[selectedDay].push({
      id: horarioNuevo[selectedDay].length + 1,
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
                  onClick={() => setSelectedDay("lunes")}
                >
                  Lunes
                </button>
              </Col>
              <Col md={2}>
                <button
                  type="button"
                  className="btn btn-info"
                  onClick={() => setSelectedDay("martes")}
                >
                  Martes
                </button>
              </Col>
              <Col md={2}>
                <button
                  type="button"
                  className="btn btn-info"
                  onClick={() => setSelectedDay("miercoles")}
                >
                  Miércoles
                </button>
              </Col>
              <Col md={2}>
                <button
                  type="button"
                  className="btn btn-info"
                  onClick={() => setSelectedDay("jueves")}
                >
                  Jueves
                </button>
              </Col>
              <Col md={2}>
                <button
                  type="button"
                  className="btn btn-info"
                  onClick={() => setSelectedDay("viernes")}
                >
                  Viernes
                </button>
              </Col>
              <Col md={2}>
                <button
                  type="button"
                  className="btn btn-info"
                  onClick={() => setSelectedDay("sabado")}
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
                          name={`inicio-${index}`}
                          value={horarioDia?.inicio?.split(" ")[0]}
                          onChange={(evt) => onChangeHorarioFromDay(evt, index)}
                        />
                      </Col>
                      <Col md={5}>
                        <label className="form-label">Hora de fin</label>
                        <br />
                        <input
                          type="time"
                          className="form-control"
                          name={`fin-${index}`}
                          value={horarioDia?.fin?.split(" ")[0]}
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
                    name={`inicio-0`}
                    onChange={onChangeHorarioFromDay}
                  />
                </Col>
                <Col md={5}>
                  <label className="form-label">Hora de fin</label>
                  <br />
                  <input
                    type="time"
                    className="form-control"
                    name={`fin-0`}
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
        <BotonSiguiente
          className="btn btn-primary"
          onClick={(e) => {
            // handleSubmit(e);
          }}
        >
          Actualizar disponibilidad
        </BotonSiguiente>

        <Boton className="btn btn-secondary" onClick={onHandleCloseModal}>
          Cancelar
        </Boton>
      </ModalFooter>
    </Modal>
  );
}

export default EditarDisponibilidadModal;
