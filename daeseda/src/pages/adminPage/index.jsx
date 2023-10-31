import Header from "../../components/common/Header";
import Orderctrl from "../../components/admin/Orderctrl";
import NoticeWrite from "../../components/admin/Noticewrite";
import FaqWrite from "../../components/admin/Faqwrite";
import Sidebar from "../../components/admin/Sidebar";
import styled from "styled-components";
import { useState } from "react";

function AdminPage() {
  const [sidebarStatus, setSidebarStatus] = useState("noticewrite");

  return (
    <div>
      <Header />
      <GridLayout>
        <Sidebar
          sidebarStatus={sidebarStatus}
          setSidebarStatus={setSidebarStatus}
        />
        {sidebarStatus === "noticewrite" ? (
          <NoticeWrite />
        ) : sidebarStatus === "faqwrite" ? (
          <FaqWrite />
        ) : sidebarStatus === "orderctrl" ? (
          <Orderctrl />
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

export default AdminPage;
