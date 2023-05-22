import { useEffect } from "react";
import { Card } from "react-bootstrap";

import {
  CardRuta,
  Subtitulo,
  Input,
  Label,
} from "src/app/Shared/assets/styles/Common.js";

import { useFetch } from "src/app/Shared/services/hooks/useFetch";
import {
  HTTP_METHOD_GET,
  URL_OBTENER_PRIMERA_ATENCION_EMP,
} from "src/app/Shared/utils/apiConstants";

function PrimeraAtencion({ idProyectoEmprendimiento }) {
  const { data, error, loading, fetchAPI } = useFetch();

  useEffect(() => {
    fetchAPI({
      URL: URL_OBTENER_PRIMERA_ATENCION_EMP,
      requestOptions: {
        method: HTTP_METHOD_GET,
        params: {
          idProyectoEmprendimiento: idProyectoEmprendimiento,
        },
      },
    });
  }, []);

  if (loading || !data) {
    // console.log("PrimeraAtencionAdmin", {
    //   loading,
    //   inverted: { data },
    // });

    return <h1>LOADING...</h1>;
  }

  if (error) {
    return (
      <>
        <h1>ERROR</h1>
        <p>{error}</p>
      </>
    );
  }

  return (
    <Card>
      <CardRuta style={{ marginTop: "1rem", marginBottom: "0rem" }}>
        <div
          style={{
            width: "100%",
            marginLeft: "2rem",
            marginRight: "2rem",
            marginBottom: "2rem",
            padding: "15px 16px 30px 14px",
          }}
        >
          <Subtitulo>Datos de Primera Atencion</Subtitulo>
          <form className="row g-3">
            <div className="col-md-6 mb-3">
              <Label htmlFor="nombreProducto" className="form-label">
                Producto o Servicio
              </Label>
              <Input
                type="text"
                className="form-control"
                id="nombreProducto"
                value={data.nombreProducto || ""}
                disabled
              />
            </div>

            <div className="col-md-6 mb-3">
              <Label htmlFor="promedioVentas" className="form-label">
                Promedio de ventas
              </Label>
              <Input
                type="text"
                className="form-control"
                id="promedioVentas"
                value={data.promedioVentas || ""}
                disabled
              />
            </div>

            <div className="col-md-6 mb-3">
              <Label htmlFor="evidenciaProducto" className="form-label">
                ¿Cual es la evidencia de su producto/servicio?
              </Label>
              <Input
                type="text"
                className="form-control"
                id="evidenciaProducto"
                value={data.evidenciaProducto || ""}
                disabled
              />
            </div>

            <div className="col-md-6 mb-3">
              <Label htmlFor="obtencionMateriasPrimas" className="form-label">
                ¿Donde consigue la materia prima?
              </Label>
              <Input
                type="text"
                className="form-control"
                id="obtencionMateriasPrimas"
                value={data.obtencionMateriasPrimas || ""}
                disabled
              />
            </div>

            <div className="col-md-6 mb-3">
              <Label htmlFor="equipoTrabajo" className="form-label">
                ¿Tiene equipo de trabajo?
              </Label>
              <select
                className="form-select"
                id="equipoTrabajo"
                value={data.equipoTrabajo || "-1"}
                disabled
              >
                <option value={"-1"} disabled>
                  Seleccione...
                </option>
                <option value="S">SI</option>
                <option value="N">NO</option>
              </select>
            </div>

            {data.equipoTrabajo == "S" && (
              <div className="col-md-6 mb-3">
                <Label htmlFor="cualEquipoTrabajo" className="form-label">
                  ¿Cual es su equipo de trabajo?
                </Label>
                <Input
                  type="text"
                  className="form-control"
                  id="cualEquipoTrabajo"
                  value={data.cualEquipoTrabajo || ""}
                  disabled
                />
              </div>
            )}

            <div className="col-md-6">
              <Label htmlFor="dedicacion" className="form-label">
                ¿A qué se dedica?
              </Label>
              <Input
                type="text"
                className="form-control"
                id="dedicacion"
                value={data.dedicacion || ""}
                disabled
              />
            </div>

            <div className="col-md-6 mb-3">
              <Label htmlFor="desdeFechaEjecucion" className="form-label">
                ¿Desde cuando lleva ejecutando la idea?
              </Label>
              <Input
                type="date"
                className="form-control"
                id="desdeFechaEjecucion"
                value={data.desdeFechaEjecucion || undefined}
                disabled
              />
            </div>

            <div className="col-md-6 mb-3">
              <Label htmlFor="horasSemanales" className="form-label">
                Número de horas dedicas a la semana
              </Label>
              <Input
                type="text"
                className="form-control"
                id="horasSemanales"
                value={data.horasSemanales || ""}
                disabled
              />
            </div>

            <div className="col-md-6 mb-3">
              <Label htmlFor="motivacion" className="form-label">
                ¿Cuál es su motivación?
              </Label>
              <Input
                type="text"
                className="form-control"
                id="motivacion"
                value={data.motivacion || ""}
                disabled
              />
            </div>

            <div className="col-md-6 mb-3">
              <Label htmlFor="descubrioSinapsis" className="form-label">
                ¿Cómo se enteró de los servicios de SINAPSIS UAO?
              </Label>
              {data.descubrioSinapsis && data.descubrioSinapsis.length > 0 && (
                <ul>
                  {data.descubrioSinapsis
                    .split(",")
                    .map((metodoDescubrio, index) => {
                      if (metodoDescubrio != "") {
                        if (metodoDescubrio == "OTRO") {
                          return (
                            <li
                              key={index}
                            >{`${metodoDescubrio} - ${data.cualOtroDescubrioSinapsis}`}</li>
                          );
                        } else {
                          return <li key={index}>{metodoDescubrio}</li>;
                        }
                      }
                    })}
                </ul>
              )}
            </div>
          </form>
        </div>
      </CardRuta>
    </Card>
  );
}

export default PrimeraAtencion;
