import ListadoAnuncios from "src/components/ListadoAnuncios";

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
