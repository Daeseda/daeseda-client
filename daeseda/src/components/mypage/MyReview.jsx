import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import axios from "axios";
import { useSelector } from "react-redux";

function Review() {
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState("");
  const token = localStorage.getItem("token");
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const userInfo = useSelector((state) => state);
  useEffect(() => {
    if (token) {
      setUser(userInfo);
    }
  }, [token]);

  useEffect(() => {
    axios
      .get(`${serverUrl}/review/list`)
      .then(function (response) {
        setReviews(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const filteredReviews = reviews.filter(
    (review) => user && review.userNickname === user.userNickname
  );

  const deleteReview = (reviewId) => {
    if (!window.confirm("리뷰를 삭제하시겠습니까?")) {
      return;
    }

    axios
      .delete(`${serverUrl}/review/${reviewId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      .then(() => {
        setReviews(reviews.filter((review) => review.reviewId !== reviewId));
        alert("리뷰가 삭제되었습니다.");
      })
      .catch((error) => {
        console.error("리뷰 삭제 중 에러 발생:", error);
        alert("리뷰 삭제에 실패했습니다.");
      });
  };

  return (
    <Main>
      <Title>
        <h3>
          {user.userNickname}님의 리뷰 ({filteredReviews.length})
        </h3>
      </Title>
      <DeliveryWrap>
        {filteredReviews.length === 0 ? (
          <p>작성한 리뷰가 없습니다.</p>
        ) : (
          filteredReviews.map((review) => (
            <ReviewItem key={review.reviewId}>
              <div
                style={{ display: "flex", alignItems: "center", gap: "4px" }}
              >
                <ReviewCategory
                  reviewId={review.reviewId}
                  serverUrl={serverUrl}
                />
                <p>{review.reviewContent}</p>
              </div>

              <Rating>
                {Array(Math.round(review.rating))
                  .fill()
                  .map((_, i) => (
                    <FontAwesomeIcon
                      key={i}
                      icon={faStar}
                      style={{ color: "#ffc700" }}
                    />
                  ))}
                {Array(5 - Math.round(review.rating))
                  .fill()
                  .map((_, i) => (
                    <FontAwesomeIcon key={i} icon={faStar} />
                  ))}
              </Rating>
              <EditDeleteButton onClick={() => deleteReview(review.reviewId)}>
                삭제하기
              </EditDeleteButton>
            </ReviewItem>
          ))
        )}
      </DeliveryWrap>
    </Main>
  );
}

const ReviewCategory = ({ reviewId, serverUrl }) => {
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    axios
      .get(`${serverUrl}/review-category/${reviewId}`)
      .then(function (response) {
        setCategoryName(response.data[0].categories.categoryName);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [serverUrl, reviewId]);

  return <Category>{categoryName}</Category>;
};

const Main = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const EditDeleteButton = styled.button`
  border: 1px solid rgb(232, 234, 237);
  padding: 4px 8px;
  border-radius: 4px;
`;

const Title = styled.div`
  border-bottom: solid 1px rgb(232, 234, 237);
  padding: 10px;
`;

const Rating = styled.div`
  font-size: 28px;
  display: flex;
  gap: 4px;
  color: #d9d9d9;
  margin: 20px 0;
`;

const DeliveryWrap = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;

const ReviewItem = styled.li`
  border: 1px solid rgb(232, 234, 237);
  padding: 12px;
  border-radius: 4px;
  margin: 4px 0;
`;

const Category = styled.p`
  background-color: rgb(93, 141, 242);
  color: white;
  padding: 4px;
  border-radius: 10px;
  display: inline-block;
`;

export default Review;
