import DescubrirseEmprendedor from "./sonar/ser_emprendedor/conectar_y_potencializar_perfil/DescubrirseEmprendedor";

function SeccionAvanzarRuta({ idSeccion, tituloSeccion }) {
  return (
    <div className="accordion m-0" id={`accordion${idSeccion}`}>
      <div className="accordion-item">
        <h2 className="accordion-header" id={`heading${idSeccion}`}>
          <button
            className="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#collapse${idSeccion}`}
            aria-expanded="true"
            aria-controls={`collapse${idSeccion}`}
          >
            {tituloSeccion}
          </button>
        </h2>
        <div
          id={`collapse${idSeccion}`}
          className="accordion-collapse collapse"
          aria-labelledby={`heading${idSeccion}`}
          data-bs-parent={`#accordion${idSeccion}`}
        >
          <div className="accordion-body">
            {1 == 1 && <DescubrirseEmprendedor />}
            {/* {1 == 1 && <DescubrirseEmprendedor />} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SeccionAvanzarRuta;
