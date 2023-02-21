import { useContext } from "react";
import { EmprendedorContext } from "src/services/context/EmprendedorContext";
import styled from "styled-components";
import EmprendedorContentLayout from "./content/EmprendedorContentLayout";
import Header from "./header/Header";
import EmprendedorNavbar from "src/layouts/navbar/EmprendedorNavbar";

const Layout = styled.div`
  margin-top: 4.5rem;
`;

function EmprendedorLayout({ children }) {
  const { showSidebar } = useContext(EmprendedorContext);

  return (
    <Layout>
      <Header />
      <EmprendedorNavbar />
      <EmprendedorContentLayout sidebar={showSidebar}>
        {children}
      </EmprendedorContentLayout>
    </Layout>
  );
}

export default EmprendedorLayout;
