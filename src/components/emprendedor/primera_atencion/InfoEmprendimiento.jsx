import { useState } from "react";
import {
  img,
  thumb,
  thumbInner,
  thumbsContainer,
} from "src/assets/styles/DropzoneStyle";
import {
  Boton,
  BotonSiguiente,
  Circulo,
  Contenido,
  Input,
  Label,
  Paso,
  TextArea,
  TituloStepByStep,
} from "src/assets/styles/emprendedor/primeraAtencion.style";
import DropZone from "src/components/DropZone";
import { validacionesPrimeraAtencionEmprendimiento } from "src/utils/validaciones";

function InfoEmprendimiento(props) {
  const [error, setError] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    let erroresFormulario = validacionesPrimeraAtencionEmprendimiento(
      props.datos
    );
    if (Object.keys(erroresFormulario).length) {
      setError(erroresFormulario);
    } else {
      setError({});
      props.nextStep();
    }
  };

  const onGetFiles = (files) => {
    props.getLogoEmpresa(files);
  };

  return (
    <Contenido className="container w-50">
      <div className="text-center">
        <Circulo>
          <Paso>2</Paso>
        </Circulo>
        <TituloStepByStep>Información del Emprendimiento</TituloStepByStep>
      </div>

      <form className="row g-3">
        <div className="mb-3">
          <Label htmlFor="nombreEmprendimiento" className="form-label">
            Nombre del emprendimiento
            <span> (*)</span>
          </Label>
          <Input
            type="text"
            className="form-control"
            id="nombreEmprendimiento"
            name="nombreEmprendimiento"
            placeholder="Nombre del emprendimiento"
            onChange={(e) => props.handleChange(e)}
            value={props.datos.nombreEmprendimiento}
          />
          {error.nombreEmprendimiento && (
            <small className="form-text font-weight-bold text-danger">
              {error.nombreEmprendimiento}
            </small>
          )}
        </div>

        <div className="col-md-6 mb-3">
          <Label htmlFor="nombreEmpresa" className="form-label">
            Nombre de empresa
          </Label>
          <Input
            type="text"
            className="form-control"
            id="nombreEmpresa"
            name="nombreEmpresa"
            placeholder="Nombre de la empresa"
            onChange={(e) => props.handleChange(e)}
            value={props.datos.nombreEmpresa}
          />
          {error.nombreEmpresa && (
            <small className="form-text font-weight-bold text-danger">
              {error.nombreEmpresa}
            </small>
          )}
        </div>

        <div className="col-md-6 mb-3">
          <Label htmlFor="nitEmpresa" className="form-label">
            NIT
          </Label>
          <Input
            type="text"
            className="form-control"
            id="nitEmpresa"
            name="nitEmpresa"
            placeholder="NIT"
            onChange={(e) => props.handleChange(e)}
            value={props.datos.nitEmpresa}
          />
          {error.nitEmpresa && (
            <small className="form-text font-weight-bold text-danger">
              {error.nitEmpresa}
            </small>
          )}
        </div>

        <div className="col-md-6 mb-3">
          <Label htmlFor="fechaCreacionEmpresa" className="form-label">
            Fecha de creación
          </Label>
          <Input
            type="date"
            className="form-control"
            name="fechaCreacionEmpresa"
            id="fechaCreacionEmpresa"
            value={props.datos.fechaCreacionEmpresa || null}
            onChange={(e) => props.handleChange(e)}
          />
          {error.fechaCreacionEmpresa && (
            <small className="form-text font-weight-bold text-danger">
              {error.fechaCreacionEmpresa}
            </small>
          )}
        </div>

        <div className="col-md-6 mb-3">
          <Label htmlFor="razonSocialEmpresa" className="form-label">
            Razón social
          </Label>
          <Input
            type="text"
            className="form-control"
            id="razonSocialEmpresa"
            name="razonSocialEmpresa"
            placeholder="Razón social"
            onChange={(e) => props.handleChange(e)}
            value={props.datos.razonSocialEmpresa}
          />
          {error.razonSocialEmpresa && (
            <small className="form-text font-weight-bold text-danger">
              {error.razonSocialEmpresa}
            </small>
          )}
        </div>

        <div className="mb-3">
          <Label htmlFor="sitioWebEmpresa" className="form-label">
            Sitio Web
          </Label>
          <Input
            type="text"
            className="form-control"
            id="sitioWebEmpresa"
            name="sitioWebEmpresa"
            placeholder="Sitio Web"
            onChange={(e) => props.handleChange(e)}
            value={props.datos.sitioWebEmpresa}
          />
          {error.sitioWebEmpresa && (
            <small className="form-text font-weight-bold text-danger">
              {error.sitioWebEmpresa}
            </small>
          )}
        </div>

        <div className="col-md-6 mb-3">
          <Label htmlFor="estaConstituida" className="form-label">
            Esta constituida
            <span> (*)</span>
          </Label>
          <select
            id="estaConstituida"
            className="form-select"
            name="estaConstituida"
            value={props.datos.estaConstituida || "-1"}
            onChange={(e) => props.handleChange(e)}
          >
            <option value={"-1"} disabled>
              Seleccione...
            </option>
            <option value="SI">SI</option>
            <option value="NO">NO</option>
          </select>
          {error.estaConstituida && (
            <small className="form-text font-weight-bold text-danger">
              {error.estaConstituida}
            </small>
          )}
        </div>

        <div className="col-md-6 mb-3">
          <Label htmlFor="fechaConstitucion" className="form-label">
            Fecha de constitución
          </Label>
          <Input
            type="date"
            className="form-control"
            name="fechaConstitucion"
            id="fechaConstitucion"
            value={props.datos.fechaConstitucion || null}
            onChange={(e) => props.handleChange(e)}
          />
          {error.fechaConstitucion && (
            <small className="form-text font-weight-bold text-danger">
              {error.fechaConstitucion}
            </small>
          )}
        </div>

        <div className="mb-3">
          <Label htmlFor="descripcionProducto" className="form-label">
            Descripción del producto<span> (*)</span>
          </Label>
          <TextArea
            type="text"
            className="form-control"
            id="descripcionProducto"
            name="descripcionProducto"
            placeholder="Descripción del producto"
            onChange={(e) => props.handleChange(e)}
            value={props.datos.descripcionProducto}
          />
          {error.descripcionProducto && (
            <small className="form-text font-weight-bold text-danger">
              {error.descripcionProducto}
            </small>
          )}
        </div>

        <div className="mb-3">
          <Label htmlFor="materiasPrimas" className="form-label">
            Materias primas<span> (*)</span>
          </Label>
          <TextArea
            type="text"
            className="form-control"
            id="materiasPrimas"
            name="materiasPrimas"
            placeholder="Materias primas"
            onChange={(e) => props.handleChange(e)}
            value={props.datos.materiasPrimas}
          />
          {error.materiasPrimas && (
            <small className="form-text font-weight-bold text-danger">
              {error.materiasPrimas}
            </small>
          )}
        </div>

        <div className="mb-3">
          <Label htmlFor="clienteEmprendimiento" className="form-label">
            Principal cliente o usuario<span> (*)</span>
          </Label>
          <TextArea
            type="text"
            className="form-control"
            id="clienteEmprendimiento"
            name="clienteEmprendimiento"
            placeholder="Principal cliente o usuario"
            onChange={(e) => props.handleChange(e)}
            value={props.datos.clienteEmprendimiento}
          />
          {error.clienteEmprendimiento && (
            <small className="form-text font-weight-bold text-danger">
              {error.clienteEmprendimiento}
            </small>
          )}
        </div>

        <div className="mb-3">
          <Label htmlFor="logoEmpresa" className="form-label nombreInput">
            Logo Empresa
          </Label>
          <DropZone upFiles={onGetFiles} files={props?.logoEmpresa} />
          {props.datos.logoEmpresa && (
            <aside style={thumbsContainer}>
              <div style={thumb} key={props.datos?.logoEmpresa[0].name}>
                <div style={thumbInner}>
                  <img
                    src={URL.createObjectURL(props.datos?.logoEmpresa[0])}
                    style={img}
                    alt={props.datos?.logoEmpresa[0].name}
                  />
                </div>
              </div>
            </aside>
          )}
          {error.logoEmpresa && (
            <small className="form-text font-weight-bold text-danger">
              {error.logoEmpresa}
            </small>
          )}
        </div>
      </form>

      <div className="col-12 d-flex justify-content-end">
        <Boton
          type="button"
          className="btn btn-outline-primary"
          onClick={() => {
            props.prevStep();
          }}
        >
          Volver
        </Boton>

        <BotonSiguiente
          type="button"
          className="btn btn-primary"
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          Siguente
        </BotonSiguiente>
      </div>
    </Contenido>
  );
}

export default InfoEmprendimiento;
