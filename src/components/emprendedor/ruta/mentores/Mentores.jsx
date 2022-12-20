import {
  Auxiliar,
  CardRuta,
  Ruta,
  SubTitulo,
  Titulo,
} from "src/assets/styles/emprendedor/rutaEmprendimiento.style";

import imagen from "src/assets/images/Sinapsis-LR.png";
import logoSinapsis from "src/assets/images/Logo_Sinapsis.png";
import logoUser from "src/assets/images/header/emprendedor/user.svg";

function Mentores() {
  return (
    <>
      <Titulo>Mentores</Titulo>

      <CardRuta>
        <Ruta>
          <SubTitulo>Mentor Asignado</SubTitulo>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h5>
                Mentor: <Auxiliar>Andres Fernando Solano</Auxiliar>
              </h5>
              <h5>
                Correo: <Auxiliar>afsolano@uao.edu.co</Auxiliar>
              </h5>
              <h5>
                Telefono: <Auxiliar>602 444 4444 - ext. 123</Auxiliar>
              </h5>
              <h5>
                Celular: <Auxiliar>+57 300 000 0000</Auxiliar>
              </h5>
            </div>
            <img
              src={logoUser}
              alt="Foto Perfil Mentor"
              style={{ width: "10rem" }}
            />
            <img src={logoSinapsis} alt="Logo Sinapsis" />
          </div>
        </Ruta>
      </CardRuta>

      <CardRuta>
        <Ruta className="card-body">
          <SubTitulo>Mi Historial de Mentores</SubTitulo>
          <div className="d-flex flex-wrap justify-content-center">
            {true ? (
              [1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => {
                return (
                  <div
                    key={index}
                    className="card text-center align-items-center p-3 m-2"
                    style={{ maxWidth: "20rem" }}
                  >
                    <img
                      src={imagen}
                      className="card-img-top d-flex"
                      alt="..."
                      style={{ maxWidth: "15rem" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">Andres Fernando Solano</h5>
                      <p className="card-text">
                        Fecha de inicio:{" "}
                        <span className="d-block">29/11/2022</span>
                      </p>
                      <p className="card-text">
                        Fecha de finalizacion:{" "}
                        <span className="d-block">29/03/2023</span>
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <Auxiliar>Sin registros</Auxiliar>
            )}
          </div>
        </Ruta>
      </CardRuta>
    </>
  );
}

export default Mentores;
