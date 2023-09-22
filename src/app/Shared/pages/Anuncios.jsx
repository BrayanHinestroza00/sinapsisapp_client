import { Titulo } from "../assets/styles/Common";
import ListadoAnuncios from "../components/ListadoAnuncios/ListadoAnuncios";

function Anuncios() {
  return (
    <>
      <Titulo>Últimos anuncios</Titulo>
      <div className="container">
        <ListadoAnuncios />
      </div>
    </>
  );
}

export default Anuncios;
