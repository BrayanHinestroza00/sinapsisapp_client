import styled from "styled-components";
import MentorContentLayout from "./content/MentorContentLayout";
import MentorHeader from "./header/MentorHeader";

const Layout = styled.div`
  margin-top: 4.5rem;
`;

function MentorLayout({ children, sidebar }) {
  return (
    <Layout>
      <MentorHeader />
      <MentorContentLayout sidebar={sidebar}>{children}</MentorContentLayout>
    </Layout>
  );
}

export default MentorLayout;
