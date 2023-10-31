import Header from "../../components/common/Header";
import Faq from "../../components/cscenter/Faq";
import Notice from "../../components/cscenter/Notice";
import Question from "../../components/cscenter/Question";
import QuestionWrite from "../../components/cscenter/QuestionWrite";
import Sidebar from "../../components/cscenter/Sidebar";
import styled from "styled-components";
import { useState } from "react";
function CscenterPage() {
  const [sidebarStatus, setSidebarStatus] = useState("notice");
  return (
    <div>
      <Header />
      <GridLayout>
        <Sidebar
          sidebarStatus={sidebarStatus}
          setSidebarStatus={setSidebarStatus}
        />
        {sidebarStatus === "notice" ? (
          <Notice />
        ) : sidebarStatus === "faq" ? (
          <Faq />
        ) : sidebarStatus === "question" ? (
          <Question write={true}/>
        ) : null}
      </GridLayout>
    </div>
  );
}

const GridLayout = styled.div`
  display: grid;
  grid-template-columns: 220px auto;
  padding: 0 20px;
`;
export default CscenterPage;
