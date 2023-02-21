import DropZone from "src/components/DropZone";

function DescubrirseEmprendedor() {
  return (
    <div>
      <h6 className="mx-0">Descubrirse como emprendedor</h6>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </p>

      <h6 className="mx-0">CAPSULA INFORMATIVA</h6>

      <div className="card mx-auto" style={{ width: "50vw" }}>
        <iframe
          src="https://www.youtube.com/embed/rrUp4fjAYc8"
          title="Introducción al curso Ruta 0 - Plataforma virtual Sinapsis UAO"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ minHeight: "50vh" }}
          className="card-img-top"
        />
        <div className="card-body">
          <p className="card-text">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
        </div>
      </div>

      <h6 className="mx-0">Herramientas del conocimiento</h6>

      <p>
        Las siguientes Herramientas te ayudaran con la apropiación de los
        conceptos mencionados anteriormente
      </p>

      <h6>Perfil de Emprendedor</h6>
      <p>
        Con la realizacion de este perfil le proponemos realizar acciones
        concretas para ayudarle a comprender mejor su potencial empresarial,
        fortalecer sus habilidades e impulsar sus proyectos de negocio.
        <br />
        <a href="https://uao-my.sharepoint.com/:x:/r/personal/djrestrepo_uao_edu_co/_layouts/15/Doc.aspx?sourcedoc=%7B73D97C66-042D-4408-A6E7-68E6325FA7C8%7D&file=3.%20Perfil%20del%20emprendedor%20Ruta%20de%20Innovaci%C3%B2n%20y%20Emprendimiento%20UAO.xlsm&action=default&mobileredirect=true">
          Descarga formato de perfil de emprendedor
        </a>
      </p>

      <form>
        <div className="text-center">
          <p>
            A continuación, podrás cargar el formato de perfil de emprendedor
            diligenciado
          </p>
          <DropZone />
          <button className="btn btn-primary mt-3 w-25">Subir</button>
        </div>
      </form>
    </div>
  );
}

export default DescubrirseEmprendedor;
