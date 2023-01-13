import styled from "styled-components";
import AdministradorContentLayout from "./content/AdministradorContentLayout";
import Header from "./header/Header";

const Layout = styled.div`
  margin-top: 4.5rem;
`;

function AdministradorLayout({ children, sidebar }) {
  return (
    <Layout>
      <Header />
      <AdministradorContentLayout sidebar={sidebar}>
        {children}
      </AdministradorContentLayout>
    </Layout>
  );
}

export default AdministradorLayout;
