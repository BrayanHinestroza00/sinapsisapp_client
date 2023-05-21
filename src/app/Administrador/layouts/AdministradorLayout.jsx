import styled from "styled-components";
import AdministradorHeader from "./header/AdministradorHeader";
import AdministradorContentLayout from "./content/AdministradorContentLayout";

const Layout = styled.div`
  margin-top: 4.5rem;
`;

function AdministradorLayout({ children, sidebar }) {
  return (
    <Layout>
      <AdministradorHeader />
      <AdministradorContentLayout sidebar={sidebar}>
        {children}
      </AdministradorContentLayout>
    </Layout>
  );
}

export default AdministradorLayout;
