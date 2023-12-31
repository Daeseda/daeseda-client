// 세탁 신청하기 페이지에서 세탁 신청 컴포넌트
import styled from "styled-components";
import Button from "../common/Button";
import Check from "../common/Check";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Request({
  normalLaundry,
  setNormalLaundry,
  specialLaundry,
  setSpecialLaundry,
  date,
}) {
  const [buttonText, setButtonText] = useState("세탁 신청하기");
  const navigate = useNavigate();
  function requestHandler() {
    if (!(normalLaundry || specialLaundry)) {
      //일반세탁, 특수세탁 아무것도 선택하지 않았을 때
      setButtonText("세탁 서비스를 선택 후 신청하세요");
    } else {
      navigate("order", {
        state: {
          normalLaundry: normalLaundry,
          specialLaundry: specialLaundry,
          date: date,
        },
      });
    }
  }
  return (
    <RequestLayout>
      <Title>세탁 서비스를 선택하세요</Title>

      <Article>
        <Service>
          <Check
            onClick={() => {
              setNormalLaundry(!normalLaundry);
            }}
          />
          <p>일반 세탁</p>
        </Service>
        <Summary>일반 세탁은 L당 세탁입니다</Summary>
        <CategoryRow>
          <p>가능 품목</p>
          <Category>반팔, 바지, 수건</Category>
        </CategoryRow>
      </Article>

      <Article>
        <Service>
          <Check
            onClick={() => {
              setSpecialLaundry(!specialLaundry);
            }}
          />
          <p>특수 세탁</p>
        </Service>
        <Summary>특수 세탁은 특수 세제를 사용합니다</Summary>
        <CategoryRow>
          <p>가능 품목</p>
          <Category>정장, 니트, 코트</Category>
        </CategoryRow>
      </Article>
      <Button text={buttonText} onClick={requestHandler} />
    </RequestLayout>
  );
}
const RequestLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 330px;
  border: 1px solid #111111;
  border-radius: 4px;
  padding: 12px;
  box-sizing: border-box;
`;
const Title = styled.p`
  font-size: 20px;
  font-weight: 500;
  padding: 0 36px;
`;

const Article = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px 24px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
`;

const Service = styled.div`
  display: flex;
  gap: 4px;
  font-weight: 500;
`;

const Summary = styled.p`
  color: #d9d9d9;
  font-size: 14px;
  padding-bottom: 4px;
  border-bottom: 1px solid #d9d9d9;
`;

const CategoryRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
`;

const Category = styled.p`
  color: rgb(93, 141, 242);
`;

export default Request;
