import styled from "styled-components";

import AdministradorHeader from "./header/AdministradorHeader";
import AdministradorContentLayout from "./content/AdministradorContentLayout";
import { useContext } from "react";
import { AdministradorContext } from "../contexts/AdministradorContext";

const Layout = styled.div`
  margin-top: 4.5rem;
`;

function AdministradorLayout({ children, sidebar }) {
  const { showSidebar } = useContext(AdministradorContext);
  return (
    <Layout>
      <AdministradorHeader />
      <AdministradorContentLayout sidebar={showSidebar}>
        {children}
      </AdministradorContentLayout>
    </Layout>
  );
}

export default AdministradorLayout;
