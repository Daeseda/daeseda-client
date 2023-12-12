import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import review from "../../assets/images/review.png";
import axios from "axios";
import { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

function Review() {
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const [reviews, setReviews] = useState([]);
  const [reviewCategory, setReviewCategory] = useState("");
  const groupSize = 5; //슬라이드당 다섯개 표현

  useEffect(() => {
    axios
      .get(`${serverUrl}/review/list`)
      .then(function (response) {
        setReviews(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const groupedReviews = [];
  for (let i = 0; i < reviews.length; i += groupSize) {
    groupedReviews.push(reviews.slice(i, i + groupSize));
  }

  function importAll(r) {
    let images = {};
    r.keys().forEach((item, index) => {
      images[item.replace("./", "")] = r(item);
    });
    return images;
  }
  
  const reviewImages = importAll(
    require.context("../../assets/review", false, /\.(png|jpe?g|svg)$/)
  );

  function extractFileName(url) {
    const parts = String(url).split('/');
    return parts[parts.length - 1];
  }

  return (
    <Carousel
      showThumbs={false}
      showArrows={false}
      showStatus={false}
      autoPlay={true}
      dynamicHeight={false}
      centerMode={false}
      centerSlidePercentage={100}
      infiniteLoop={true}
      width={1500}
    >
      {groupedReviews.map((group, groupIndex) => (
        <ReviewLayout key={groupIndex}>
          {group.map((reviewData, index) => (
            <ReviewArticle key={index}>
              <ImgWrapper>
                <Img
                src={reviewImages[extractFileName(reviewData.imageUrl)]}
                alt={extractFileName(reviewData.imageUrl)}
                />

                <ReviewCategory
                  reviewId={reviewData.reviewId}
                  serverUrl={serverUrl}
                />
                <Category>{reviewCategory}</Category>
              </ImgWrapper>
              <Rating>
                {Array(Math.round(reviewData.rating))
                  .fill()
                  .map((_, i) => (
                    <FontAwesomeIcon
                      key={i}
                      icon={faStar}
                      style={{ color: "#ffc700" }}
                    />
                  ))}
                {Array(5 - Math.round(reviewData.rating))
                  .fill()
                  .map((_, i) => (
                    <FontAwesomeIcon key={i} icon={faStar} />
                  ))}
              </Rating>
              <ReviewInfo>
                <p>{reviewData.reviewContent}</p>
              </ReviewInfo>
            </ReviewArticle>
          ))}
        </ReviewLayout>
      ))}
    </Carousel>
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

const ReviewLayout = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  margin-bottom: 30px;
`;

const ReviewArticle = styled.article`
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const ImgWrapper = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
`;

const Img = styled.img`
  border-radius: 0.5rem;
  box-shadow: 0px 0px 7px #666;
  width: 200px;
  height: 200px;
`;

const Category = styled.p`
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: rgb(93, 141, 242);
  color: white;
  padding: 4px;
  border-radius: 10px;
`;

const Rating = styled.div`
  font-size: 28px;
  display: flex;
  gap: 4px;
  color: #d9d9d9;
`;

const ReviewInfo = styled.div`
  gap: 2px;
`;

export default Review;
