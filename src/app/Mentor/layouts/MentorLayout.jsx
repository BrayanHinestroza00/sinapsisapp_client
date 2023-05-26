import { useContext } from "react";
import styled from "styled-components";

import MentorHeader from "./header/MentorHeader";
import MentorContentLayout from "./content/MentorContentLayout";

import { MentorContext } from "../contexts/MentorContext";

const Layout = styled.div`
  margin-top: 4.5rem;
`;

function MentorLayout({ children, sidebar }) {
  const { showSidebar } = useContext(MentorContext);
  return (
    <Layout>
      <MentorHeader />
      <MentorContentLayout sidebar={showSidebar}>
        {children}
      </MentorContentLayout>
    </Layout>
  );
}

export default MentorLayout;
