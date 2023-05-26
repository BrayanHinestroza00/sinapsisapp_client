import { Input, Label } from "src/app/Shared/assets/styles/Common";
import { HOST } from "src/app/Shared/utils/apiConstants";

import default_image from "src/app/Shared/assets/images/default_profile_picture.png";

function VerPerfil({ datos }) {
  return (
    <form className="row g-3 mt-1">
      <div className="col-md-12 text-center mb-3">
        <img
          src={datos.fotoUrl ? `${HOST}/${datos.fotoUrl}` : default_image}
          alt="Foto de perfil"
          width={"30%"}
        />
      </div>

      <div className="col-md-6 mb-3">
        <Label htmlFor="nombreCompleto" className="form-label">
          Nombre Completo
        </Label>
        <Input
          type="text"
          className="form-control"
          id="nombreCompleto"
          value={`${datos.nombreCompleto}`}
          disabled
        />
      </div>

      <div className="col-md-6 mb-3">
        <Label htmlFor="docIdentificacion" className="form-label">
          Documento de Identificación
        </Label>
        <Input
          type="text"
          className="form-control"
          id="docIdentificacion"
          value={`${datos.acronimoTipoDocumento} - ${datos.numeroDocumento}`}
          disabled
        />
      </div>

      <div className="col-md-6 mb-3">
        <Label htmlFor="correoInstitucional" className="form-label">
          Correo Institucional
        </Label>
        <Input
          type="text"
          className="form-control"
          id="correoInstitucional"
          value={datos.correoInstitucional || "No Registra"}
          disabled
        />
      </div>

      <div className="col-md-6 mb-3">
        <Label htmlFor="correoPersonal" className="form-label">
          Correo Personal
        </Label>
        <Input
          type="text"
          className="form-control"
          id="correoPersonal"
          value={datos.correoPersonal || ""}
          disabled
        />
      </div>

      <div className="col-md-6 mb-3">
        <Label htmlFor="telefonoContacto" className="form-label">
          Teléfono de contacto
        </Label>
        <Input
          type="text"
          className="form-control"
          id="telefonoContacto"
          value={datos.telefonoContacto || "No Registra"}
          disabled
        />
      </div>

      <div className="col-md-6 mb-3">
        <Label htmlFor="facultad_dependencia" className="form-label">
          Dependencia / Facultad
        </Label>
        <Input
          type="text"
          className="form-control"
          id="facultad_dependencia"
          value={
            datos.dependencia
              ? datos.dependencia
              : datos.facultad
              ? datos.facultad
              : ""
          }
          disabled
        />
      </div>

      <div className="col-md-6 mb-3">
        <Label htmlFor="cargo" className="form-label">
          Cargo
        </Label>
        <Input
          type="text"
          className="form-control"
          id="cargo"
          value={datos.cargo || "No Registra"}
          disabled
        />
      </div>
    </form>
  );
}

export default VerPerfil;
