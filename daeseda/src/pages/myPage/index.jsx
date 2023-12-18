import React, { useState } from "react";
import styled from "styled-components";
import Header from "../../components/common/Header";
import Sidebar from "../../components/mypage/Sidebar";
import MyInfo from "../../components/mypage/MyInfo";
import DeliveryAddress from "../../components/mypage/DeliveryAddress";
import Withdraw from "../../components/mypage/Withdraw";
import Question from "../../components/cscenter/Question";
import MyReview from "../../components/mypage/MyReview";
function MyPage() {
  const [selectedItemId, setSelectedItemId] = useState("info");
  return (
    <div>
      <Header />
      <GridLayout>
        <Sidebar
          selectedItemId={selectedItemId}
          setSelectedItemId={setSelectedItemId}
        />
        {selectedItemId === "info" ? (
          <MyInfo/>
        ) : selectedItemId === "delivery" ? (
          <DeliveryAddress />
        ) : selectedItemId === "withdrawal" ? <Withdraw/> : selectedItemId === "review" ? (
          <MyReview />
        ): selectedItemId === "board" ? <Question mypage={true}/> : null}
      </GridLayout>
    </div>
  );
}

const GridLayout = styled.div`
  display: grid;
  grid-template-columns: 220px auto;
  padding: 0 20px;
`;

export default MyPage;
