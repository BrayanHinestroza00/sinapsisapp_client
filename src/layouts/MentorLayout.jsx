import styled from "styled-components";
import MentorContentLayout from "./content/MentorContentLayout";
import Header from "./header/Header";

const Layout = styled.div`
  margin-top: 4.5rem;
`;

function MentorLayout({ children, sidebar }) {
  return (
    <Layout>
      <Header />
      <MentorContentLayout sidebar={sidebar}>{children}</MentorContentLayout>
    </Layout>
  );
}

export default MentorLayout;
