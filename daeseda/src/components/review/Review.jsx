// 작성한 리뷰 목록을 출력하는 컴포넌트
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import review from "../../assets/images/review.png";
function Review() {
  return (
    <ReviewLayout>
      <ReviewArticle>
        <Img src={review} alt="리뷰 사진" />
        <Rating>
          <FontAwesomeIcon icon={faStar} style={{ color: "#ffc700" }} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
        </Rating>
        <ReviewInfo>
          <p>좋은 세탁이네요</p>
          <Small>홍길동</Small>
          <Small>18시간 전</Small>
        </ReviewInfo>
      </ReviewArticle>
    </ReviewLayout>
  );
}

const ReviewLayout = styled.section``;

const ReviewArticle = styled.article`
  width: 200px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Img = styled.img`
  width: 200px;
  height: 200px;
  border-radius:5px;
`;

const Rating = styled.div`
  font-size: 28px;
  display: flex;
  gap: 4px;
  color: #d9d9d9;
`;

const ReviewInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const Small = styled.p`
  font-size: 14px;
`;

export default Review;
