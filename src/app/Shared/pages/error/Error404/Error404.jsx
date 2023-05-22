import {
  Error404Anchor,
  Error404Container,
  Error404Paragraph,
  Error404SubTitle,
  Error404Title,
  Error404TitleContainer,
} from "./styled.js";

function Error404() {
  return (
    <Error404>
      <Error404Container>
        <Error404TitleContainer>
          <Error404Title>404</Error404Title>
        </Error404TitleContainer>
        <Error404SubTitle>Oops! PAGINA NO ENCONTRADA</Error404SubTitle>
        <Error404Paragraph>
          Es posible que la página que está buscando se haya eliminado, cambiado
          el nombre o no está disponible temporalmente.
          <Error404Anchor href={`/`}>Volver a inicio</Error404Anchor>
        </Error404Paragraph>
      </Error404Container>
    </Error404>
  );
}

export default Error404;
