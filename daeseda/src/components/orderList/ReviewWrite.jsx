//리뷰 작성 컴포넌트
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { useState } from "react";
import Button from "../common/Button";

function ReviewWrite() {
  const [selectedImage, setSelectedImage] = useState(null);
  const addImgHandler = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <ReviewWriteLayout>
      <Title>리뷰작성</Title>
      <p>사진</p>
      {selectedImage ? (
        <ReviewImg src={selectedImage} alt="리뷰 사진" />
      ) : (
        <AddImg>
          <label>
            <input
              type="file"
              accept="image/*"
              onChange={addImgHandler}
              style={{ display: "none", width: "100%", height: "100%" }}
            />
            사진 추가
          </label>
        </AddImg>
      )}
      <p>평점</p>
      <Rating>
        <FontAwesomeIcon icon={faStar} style={{ color: "#ffc700" }} />
        <FontAwesomeIcon icon={faStar} />
        <FontAwesomeIcon icon={faStar} />
        <FontAwesomeIcon icon={faStar} />
        <FontAwesomeIcon icon={faStar} />
      </Rating>
      <p>내용</p>
      <Summary />
      <Button text="리뷰 작성하기" size="150px" />
    </ReviewWriteLayout>
  );
}

const ReviewWriteLayout = styled.section`
  display: flex;
  flex-direction: column;
  width: 400px;
  gap: 10px;
  font-size: 16px;
`;

const Title = styled.p`
  font-size: 18px;
  font-weight: 500;
`;

const ReviewImg = styled.img`
  width: 300px;
  height: 200px;
`;

const AddImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 100px;
  background-color: rgb(232, 234, 237);
  cursor: pointer;
`;

const Rating = styled.div`
  font-size: 28px;
  display: flex;
  gap: 4px;
  color: #d9d9d9;
`;

const Summary = styled.textarea`
  width: 300px;
  height: 100px;
  border: 1px solid rgb(232, 234, 237);
  outline: none;
  font-size: 18px;
`;

export default ReviewWrite;
