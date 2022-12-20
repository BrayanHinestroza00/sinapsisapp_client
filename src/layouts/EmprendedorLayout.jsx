import styled from "styled-components";
import EmprendedorContentLayout from "./content/EmprendedorContentLayout";
import Header from "./header/Header";
import EmprendedorNavbar from "./navbar/EmprendedorNavbar";

const Layout = styled.div`
  margin-top: 4.5rem;
`;

function EmprendedorLayout({ children, sidebar = false }) {
  return (
    <Layout>
      <Header />
      <EmprendedorNavbar />
      {/* {sidebar === false && <EmprendedorNavbar />} */}

      <EmprendedorContentLayout sidebar={sidebar}>
        {children}
      </EmprendedorContentLayout>
    </Layout>
  );
}

export default EmprendedorLayout;
