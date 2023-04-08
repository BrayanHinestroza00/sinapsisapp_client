import ListadoAnuncios from "src/components/ListadoAnuncios";

const data = [1];
function HomePage() {
  return (
    <>
      <h1>Últimos anuncios</h1>
      <div className="container">
        <ListadoAnuncios />
      </div>
    </>
  );
}

export default HomePage;
