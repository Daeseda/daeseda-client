import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../common/Button";
import Check from "../common/Check";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function DeliveryAddress() {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [defaultAddressId, setDefaultAddressId] = useState(null);
  const token = localStorage.getItem("token");
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const handleEditClick = (addressId) => {
    // 클릭한 주소의 ID를 사용하여 수정 페이지로 이동
    navigate(`edit-delivery-address/${addressId}`);
  };

  const [firstTerms, setFirstTerms] = useState(false);

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
          setLoading(false);
        })
        .catch((error) => {
          console.error("주소 목록을 가져오는 중 에러 발생:", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [token]);

  const deleteAddress = (addressId, address) => {
    if (!window.confirm("주소를 삭제하시겠습니까?")) {
      return;
    }

    axios
      .delete(`${serverUrl}/users/address/delete?addressId=${addressId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: address,
      })
      .then(() => {
        // 주소 삭제 성공
        setAddresses(addresses.filter((addr) => addr.addressId !== addressId));
        alert("주소가 삭제되었습니다.");
        navigate("/myinfo"); // 페이지 갱신
      })
      .catch((error) => {
        console.error("주소 삭제 중 에러 발생:", error);
        alert("주소 삭제에 실패했습니다.");
      });
  };

  const defaultAddressSet = (addressId) => {
    if (defaultAddressId === addressId) {
      return;
    }

    if (window.confirm('기본 배송지로 설정하시겠습니까?')) {
      axios
        .post(
          `${serverUrl}/users/address/setting`,
          { addressId: addressId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            console.log('기본 배송지로 설정되었습니다.');
            setDefaultAddressId(addressId);
          } else {
            console.error('요청에 실패했습니다.');
          }
        })
        .catch((error) => {
          console.error('요청 중 오류가 발생했습니다.', error);
        });
    }
  };
  

  return (
    <Main>
      <Title>
        <h3>내 배송지 관리 ({addresses.length})</h3>
      </Title>
      <DeliveryAddressLayout>
        <DeliveryWrap>
          {loading ? (
            <div>Loading...</div>
          ) : (
            addresses.map((address) => (
              <DeliveryAddressArticle key={address.addressId}>
                <NameWrap>
                  <Name>{address.addressName}</Name>
                  <Check
                    onClick={() => {
                      setFirstTerms(!firstTerms);
                      if (defaultAddressId !== address.addressId) {
                        setDefaultAddressId(address.addressId);
                        defaultAddressSet(address.addressId);
                      }
                    }}
                    isChecked={defaultAddressId === address.addressId}
                  />
                </NameWrap>
                <Address>
                  <MiddleText>{address.addressRoad} {address.addressDetail}</MiddleText>
                  <SmallText>({address.addressZipcode})</SmallText>
                </Address>
                <ButtonWrapper>
                  <EditDeleteButton
                    onClick={() => handleEditClick(address.addressId)}
                  >
                    수정하기
                  </EditDeleteButton>
                  <EditDeleteButton
                    onClick={() => deleteAddress(address.addressId, address)}
                  >
                    삭제하기
                  </EditDeleteButton>
                </ButtonWrapper>
              </DeliveryAddressArticle>
            ))
          )}
        </DeliveryWrap>
        <Button
          text="배송지 추가하기"
          size="120px"
          onClick={() => navigate("add-delivery-address")}
        />
      </DeliveryAddressLayout>
    </Main>
  );
}
const DeliveryWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;
const DeliveryAddressLayout = styled.section`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const DeliveryAddressArticle = styled.article`
  border: 1px solid rgb(232, 234, 237);
  width: 300px;
  display: inline-block;
  padding: 12px;
  border-radius: 4px;
`;

const Name = styled.p`
  font-size: 17px;
  font-weight: 500;
`;

const NameWrap = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 4px;
`;

const Address = styled.p`
  margin: 5px 0;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 4px;
  font-size: 15px;
`;

const EditDeleteButton = styled.button`
  border: 1px solid rgb(232, 234, 237);
  padding: 4px 8px;
  border-radius: 4px;
  margin-top: 5px;
`;

const SmallText = styled.p`
  color: rgba(0, 0, 0, 0.6);
  font-size: 12px;
`;

const MiddleText = styled.p`
  font-size: 15px;
`;
const Main = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
const Title = styled.div`
  border-bottom: solid 1px rgb(232, 234, 237);
  padding: 10px;
`;
export default DeliveryAddress;
