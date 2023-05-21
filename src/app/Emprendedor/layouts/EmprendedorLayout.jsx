import styled from "styled-components";
import { useContext } from "react";

import EmprendedorNavbar from "./navbar/EmprendedorNavbar";
import EmprendedorContentLayout from "./content/EmprendedorContentLayout";
import EmprendedorHeader from "./header/EmprendedorHeader";
import { EmprendedorContext } from "../contexts/EmprendedorContext";

const Layout = styled.div`
  margin-top: 4.5rem;
`;

function EmprendedorLayout({ children }) {
  const { showSidebar } = useContext(EmprendedorContext);

  return (
    <Layout>
      <EmprendedorHeader />
      <EmprendedorNavbar />
      <EmprendedorContentLayout sidebar={showSidebar}>
        {children}
      </EmprendedorContentLayout>
    </Layout>
  );
}

export default EmprendedorLayout;
