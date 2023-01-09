import {
  BotonSiguiente,
  Input,
  Label,
} from "src/assets/styles/emprendedor/primeraAtencion.style";
import { SubTitulo } from "src/assets/styles/emprendedor/rutaEmprendimiento.style";

import LogoSinapsis from "src/assets/images/Logo_Sinapsis.png";

function FormEditarCuenta() {
  return (
    <form className="container mb-5">
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <SubTitulo className="m-0">Actualizar Contraseña</SubTitulo>
          </div>

          <div className="d-flex">
            <div className="row g-3 p-3">
              <p className="text-muted">
                Los campos marcados con
                <span className="text-danger"> (*)</span> son obligatorios
              </p>
              <div className="col-md-12">
                <Label htmlFor="nombreCompleto" className="form-label">
                  Contraseña antigua
                  <span> (*)</span>
                </Label>
                <Input
                  type="text"
                  className="form-control"
                  id="nombreCompleto"
                />
              </div>
              <div className="col-md-12">
                <Label htmlFor="nombreCompleto" className="form-label">
                  Contraseña nueva
                  <span> (*)</span>
                </Label>
                <Input
                  type="text"
                  className="form-control"
                  id="nombreCompleto"
                />
              </div>
              <div className="col-md-12">
                <Label htmlFor="nombreCompleto" className="form-label">
                  Confirmación contraseña nueva
                  <span> (*)</span>
                </Label>
                <Input
                  type="text"
                  className="form-control"
                  id="nombreCompleto"
                />
              </div>

              <div className="col-md-12 text-center">
                <BotonSiguiente type="button" className="btn btn-primary">
                  Actualizar
                </BotonSiguiente>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <img
                src={LogoSinapsis}
                alt="Logo Sinapsis"
                className="logo_sinapsis"
                style={{
                  width: "20vw",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default FormEditarCuenta;
