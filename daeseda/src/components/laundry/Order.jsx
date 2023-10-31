// 세탁 신청서 작성 컴포넌트
import styled from "styled-components";
import Check from "../common/Check";
import truck from "../../assets/images/truck.png";
import bill from "../../assets/images/bill.png";
import change from "../../assets/images/change.png";
import Button from "../common/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import WarningMessage from "../common/WarningMessage";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Complete from "./Complete";
import Modal from "../common/Modal";
import AddDeliveryAddress from "../mypage/AddDeliveryAddress";

function Order() {
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  // Request에서 보낸 데이터를 state 초기값으로 저장
  const location = useLocation();
  const navigate = useNavigate();
  const [normalLaundry, setNormalLaundry] = useState(
    location.state.normalLaundry
  );
  const [specialLaundry, setSpecialLaundry] = useState(
    location.state.specialLaundry
  );
  const [date, setDate] = useState(location.state.date);
  const [password, setPassword] = useState("");
  const [firstTerms, setFirstTerms] = useState(false);
  const [secondTerms, setSecondTerms] = useState(false);
  const [firstTermsWarningMessage, setFirstTermsWarningMessage] =
    useState(false);
  const [secondTermsWarningMessage, setSecondTermsWarningMessage] =
    useState(false);
  const [deliveryLocation, setDeliveryLocation] = useState("문 앞");
  const [isAddAddressModalOpen, setIsAddAdressModalOpen] = useState(false);
  const [firstSelect, setFirstSelect] = useState(true)
  // 날짜 관련 함수, 요일을 반환하는 함수 선언식으로 정의
  function getDayOfWeek(date) {
    const daysOfWeek = [
      "일요일",
      "월요일",
      "화요일",
      "수요일",
      "목요일",
      "금요일",
      "토요일",
    ];
    return daysOfWeek[date.getDay()];
  }

  function formattedDate(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayOfWeek = getDayOfWeek(date);

    return `${year}년 ${month < 10 ? `0${month}` : month}월 ${
      day < 10 ? `0${day}` : day
    }일 ${dayOfWeek}`;
  }

  //수거 위치 관련 함수
  function deliveryLocationChangeHandler() {
    if (deliveryLocation === "문 앞") {
      setDeliveryLocation("경비실");
    } else if (deliveryLocation === "경비실") {
      setDeliveryLocation("로비");
    } else if (deliveryLocation === "로비") {
      setDeliveryLocation("문 앞");
    }
  }

  //주소 관련 함수
  const [addresses, setAddresses] = useState([]);
  const [addressId, setAddressId] = useState("");
  const [addressName, setAddressName] = useState("");
  const [addressRoad, setAddressRoad] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [addressZipcode, setAddressZipcode] = useState("");
  const [defaultAddressId, setDefaultAddressId] = useState("");
  const [defaultAddressName, setDefaultAddressName] = useState("");
  const [defaultAddressRoad, setDefaultAddressRoad] = useState("");
  const [defaultAddressDetail, setDefaultAddressDetail] = useState("");
  const [defaultAddressZipcode, setDefaultAddressZipcode] = useState("");
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      axios
        .get(`${serverUrl}/users/address/list`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setAddresses(response.data); // 주소 목록 데이터 설정

          setAddressId(response.data[0].addressId)
          setAddressName(response.data[0].addressName);
          setAddressRoad(response.data[0].addressRoad);
          setAddressDetail(response.data[0].addressDetail);
          setAddressZipcode(response.data[0].addressZipcode);
          
          const selectedAddress = response.data.find(
            (address) => address.defaultAddress == true
          );
          setDefaultAddressId(selectedAddress.addressId)
          setDefaultAddressName(selectedAddress.addressName)
          setDefaultAddressRoad(selectedAddress.addressRoad)
          setDefaultAddressDetail(selectedAddress.addressDetail)
          setDefaultAddressZipcode(selectedAddress.addressZipcode)
          if (selectedAddress) {
            // 선택한 주소 정보를 설정
            setAddressId(selectedAddress.addressId)
            setAddressName(selectedAddress.addressName);
            setAddressRoad(selectedAddress.addressRoad);
            setAddressDetail(selectedAddress.addressDetail);
            setAddressZipcode(selectedAddress.addressZipcode);
          }
        })
        .catch((error) => {
          console.error("주소 목록을 가져오는 중 에러 발생:", error);
        });
    }
  }, [isAddAddressModalOpen]);

  function addressChangeHandler(e) {
    const selectedAddressId = e.target.value;
    setAddressId(selectedAddressId);

    const selectedAddress = addresses.find(
      (address) => address.addressId == selectedAddressId
    );
    console.log("hi", selectedAddress)
    if (selectedAddress) {
      setAddressId(selectedAddress.addressId)
      setAddressName(selectedAddress.addressName);
      setAddressRoad(selectedAddress.addressRoad);
      setAddressDetail(selectedAddress.addressDetail);
      setAddressZipcode(selectedAddress.addressZipcode);
    }
  }

  //의류 선택 관련 함수
  const [clothesDummy, setClothesDummy] = useState([]);
  const [clothesSelections, setClothesSelections] = useState([
    createClothesSelection(),
  ]);

  function createClothesSelection() {
    return {
      clothesId: "",
      categoryId: "",
      clothesName: "",
      clothesPrice: "",
      clothesCount: 1,
    };
  }

  function addClothesSelection() {
      setClothesSelections([...clothesSelections, createClothesSelection()]);
  }

  function removeClothesSelection(index) {
    const updatedClothesSelections = [...clothesSelections];
    updatedClothesSelections.splice(index, 1);
    setClothesSelections(updatedClothesSelections);
  }

  useEffect(() => {
    axios
      .get(`${serverUrl}/clothes/list`)
      .then(function (response) {
        setClothesDummy(response.data);
      })
      .catch(function (error) {
        console.error("의류 정보를 불러오는 데에 실패하였습니다", error);
      });
  }, []);

  function clothesChangeHandler(e, index) {
    const selectedClothesId = e.target.value;
    const selectedClothes = clothesDummy[selectedClothesId];

    if (selectedClothes) {
      const updatedClothesSelections = [...clothesSelections];
      updatedClothesSelections[index] = {
        ...updatedClothesSelections[index],
        clothesId: selectedClothesId,
        categoryId: selectedClothes.categoryId,
        clothesName: selectedClothes.clothesName,
        clothesPrice: selectedClothes.clothesPrice,
      };
      setClothesSelections(updatedClothesSelections);
    }
  }

  function countMinusHandler(index) {
    if (clothesSelections[index].clothesCount > 1) {
      const updatedClothesSelections = [...clothesSelections];
      updatedClothesSelections[index] = {
        ...updatedClothesSelections[index],
        clothesCount: updatedClothesSelections[index].clothesCount - 1,
      };
      setClothesSelections(updatedClothesSelections);
    }
  }

  function countPlusHandler(index) {
    const updatedClothesSelections = [...clothesSelections];
    updatedClothesSelections[index] = {
      ...updatedClothesSelections[index],
      clothesCount: updatedClothesSelections[index].clothesCount + 1,
    };
    setClothesSelections(updatedClothesSelections);
  }

  //몇일 후의 날짜를 리턴하는 함수, 아무 값도 넣지 않으면 오늘 날짜를 리턴
  function addDaysToDate(inputDate, days) {
    const date = new Date(inputDate);
    date.setDate(date.getDate() + days);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  function orderHandler() {
    // 각 의류별 총 가격을 계산
    let totalPrice = 0;
    const hasEmptyClothesId = clothesSelections.some(
      (selection) => selection.clothesId === ""
    );

    if (hasEmptyClothesId) {
      // 하나라도 clothesId가 비어있으면 처리 중단
      alert("세탁 의류를 모두 선택해주세요");
      return;
    }

    clothesSelections.forEach((selection) => {
      totalPrice += selection.clothesPrice * selection.clothesCount;
    });

    // 나머지 로직은 totalPrice가 먼저 계산된 후 실행됩니다
    const clothesCount = clothesSelections
      .filter((selection) => selection.clothesId !== "")
      .map((selection) => ({
        clothes: {
          clothesId: parseInt(selection.clothesId)+1,
          clothesName: selection.clothesName,
          categoryId: selection.categoryId,
        },
        count: selection.clothesCount,
      }));



    if (!firstTerms) setFirstTermsWarningMessage(true);
    else setFirstTermsWarningMessage(false);
    if (!secondTerms) setSecondTermsWarningMessage(true);
    else setSecondTermsWarningMessage(false);
    if (firstTerms && secondTerms) {
      axios
        .post(
          `${serverUrl}/orders/request`,
          {
            address: {
              addressId: addressId,
              addressName: addressName,
              addressRoad: addressRoad,
              addressDetail: addressDetail,
              addressZipcode: addressZipcode,
              defaultAddress: addressId === defaultAddressId ? true : false,
            },
            clothesCount,
            totalPrice: totalPrice,
            washingMethod:
              normalLaundry && specialLaundry
                ? "일반세탁, 특수세탁"
                : normalLaundry
                ? "일반세탁"
                : specialLaundry
                ? "특수세탁"
                : null,
            pickupDate: addDaysToDate(new Date(date), 0),
            deliveryDate: addDaysToDate(new Date(date), 3),
            deliveryLocation: deliveryLocation,
          },
          { headers }
        )
        .then(function (response) {
          setOrderComplete(true);
        })
        .catch(function (error) {
          alert("주문에 실패했습니다");
          console.log("주문 실패 오류 발생:", error);
          setOrderComplete(false);
        });
    }
  }

  const openAddAddressModal = () => {
    setIsAddAdressModalOpen(true);
  };

  const closeAddAddressModal = () => {
    setIsAddAdressModalOpen(false);
  };

  const [orderComplete, setOrderComplete] = useState(false);
  return (
    <div>
      {orderComplete === false ? (
        <>
          <OrderLayout>
            <Title>주문내용</Title>
            {clothesSelections.map((selection, index) => (
              <div key={index}>
                <Row>
                  <RowRight>
                    <Select
                      name=""
                      id=""
                      onChange={(e) => clothesChangeHandler(e, index)}
                    >
                      <option value="">세탁할 의류를 선택하세요</option>
                      {clothesDummy.map((clothes) => (
                        <option
                          key={clothes.clothesId}
                          value={clothes.clothesId-1}
                        >
                          {clothes.clothesName}
                        </option>
                      ))}
                    </Select>
                    {selection.clothesPrice === "" ? null : (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <Count>
                          <FontAwesomeIcon
                            icon={faMinus}
                            onClick={() => countMinusHandler(index)}
                            style={{
                              backgroundColor: "rgb(232,234,237)",
                              padding: "4px",
                              cursor: "pointer",
                            }}
                          />
                          <CountText>{selection.clothesCount}</CountText>
                          <FontAwesomeIcon
                            icon={faPlus}
                            onClick={() => countPlusHandler(index)}
                            style={{
                              backgroundColor: "rgb(232,234,237)",
                              padding: "4px",
                              cursor: "pointer",
                            }}
                          />
                        </Count>
                        <ClothesPrice>
                          {(
                            parseInt(selection.clothesPrice) *
                            selection.clothesCount
                          ).toLocaleString()}
                          원
                        </ClothesPrice>
                      </div>
                    )}
                  </RowRight>
                  {selection.clothesPrice === "" ? null : (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        marginLeft: "10px",
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faTrashCan}
                        style={{ fontSize: "25px", cursor: "pointer" }}
                        onClick={() => removeClothesSelection(index)}
                        onMouseEnter={(e) => e.currentTarget.style.color = "rgb(253, 71, 85)"}
                        onMouseLeave={(e) => e.currentTarget.style.color = ""}
                      />
                    </div>
                  )}
                </Row>
              </div>
            ))}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                margin: "10px 0",
              }}
            >
              <FontAwesomeIcon
                icon={faPlus}
                style={{
                  backgroundColor: "rgb(232,234,237)",
                  padding: "8px",
                  fontSize: "18px",
                  cursor: "pointer",
                }}
                onClick={addClothesSelection}
              />
            </div>

            <div style={{ margin: "5px 0" }}></div>
            <Row>
              <p>세탁서비스</p>
              {normalLaundry && specialLaundry ? (
                <p>일반세탁, 특수세탁</p>
              ) : normalLaundry ? (
                <p>일반세탁</p>
              ) : specialLaundry ? (
                <p>특수세탁</p>
              ) : null}
            </Row>
            <RequestMessage type="text" placeholder="요청사항 입력하기" />
            <Title>수거/배송정보</Title>
            <Row>
              <p>수거시간</p>
              <RowRight>{formattedDate(date)}</RowRight>
            </Row>

            <Row>
              <p>배송주소</p>
              <RowRight>
                {firstSelect && defaultAddressId ? <select
                  name=""
                  id=""
                  style={{ fontSize: "16px" }}
                  onChange={addressChangeHandler}
                  onClick={()=>{
                    if(firstSelect) setFirstSelect(false)
                  }}
                >
                    <option
                      key={defaultAddressId}
                      value={defaultAddressId}
                      style={{ textAlign: "right" }}
                    >
                      ({defaultAddressZipcode}) {defaultAddressRoad} {defaultAddressDetail}
                    </option>
                </select> : <select
                  name=""
                  id=""
                  style={{ fontSize: "16px" }}
                  onChange={addressChangeHandler}
                >
                  {addresses.map((address) => (
                    <option
                      key={address.addressId}
                      value={address.addressId}
                      style={{ textAlign: "right" }}
                    >
                      ({address.addressZipcode}) {address.addressRoad} {address.addressDetail}
                    </option>
                  ))}
                </select>}
              
                
                <FontAwesomeIcon
                  icon={faPlus}
                  style={{
                    backgroundColor: "rgb(232,234,237)",
                    padding: "8px",
                  }}
                  onClick={openAddAddressModal}
                />
                <Modal
                  isOpen={isAddAddressModalOpen}
                  onClose={closeAddAddressModal}
                >
                  <AddDeliveryAddress modal={true} />
                </Modal>
              </RowRight>
            </Row>

            <Row
              style={{
                borderBottom: "1px solid #111111",
                paddingBottom: "20px",
              }}
            >
              <p>수거/배송위치</p>
              <RowRight>
                <p>{deliveryLocation}</p>
                <Change src={change} onClick={deliveryLocationChangeHandler} />
              </RowRight>
            </Row>
            <Title>이용안내</Title>
            <Guide>
              <GuideImg src={truck} alt="" />
              <p>9/11(월) 오후 11시까지 세탁물을 문 앞에 위치시켜주세요</p>
              <Check
                onClick={() => {
                  setFirstTerms(!firstTerms);
                }}
              />
              {firstTermsWarningMessage ? (
                <WarningMessage text="이용안내 사항을 확인하고 동의하세요" />
              ) : null}
            </Guide>
            <Guide style={{ marginBottom: "20px" }}>
              <GuideImg src={bill} alt="" />
              <p>
                세탁비는 수거 후 인수증에서 요금을 확인하신 후 7일 이내
                결제해주세요
              </p>
              <Check
                onClick={() => {
                  setSecondTerms(!secondTerms);
                }}
              />
              {secondTermsWarningMessage ? (
                <WarningMessage text="이용안내 사항을 확인하고 동의하세요" />
              ) : null}
            </Guide>
            <Button text="세탁 신청하기" onClick={orderHandler} />
          </OrderLayout>
        </>
      ) : (
        <Complete
          pickupDate={formattedDate(date)}
          addressRoad={addressRoad}
          addressDetail={addressDetail}
          deliveryLocation={deliveryLocation}
        />
      )}
    </div>
  );
}

const OrderLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding:24px 15%;
    @media (max-width: 768px) {
        padding-left:10px;
        padding-right:10px;
  }
`;

const Title = styled.p`
  font-size: 20px;
  font-weight: 500;
  margin-top: 10px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RowRight = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Change = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const RequestMessage = styled.input`
  padding: 12px 0;
  font-size: 14px;
  border-bottom: 1px solid #d9d9d9;
  outline: none;
`;

const Guide = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const GuideImg = styled.img`
  width: 40px;
  height: 40px;
`;

const Select = styled.select`
  font-size: 16px;
`;

const ClothesPrice = styled.p`
  text-align: right;
`;

const Count = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const CountText = styled.p`
  margin: 0 4px;
`;
export default Order;
