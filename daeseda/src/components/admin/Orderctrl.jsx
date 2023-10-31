import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Button from '../common/Button';

function Orderctrl() {
    const [orders, setOrders] = useState([]);
    const token = localStorage.getItem("token");
    const [status, setStatus] = useState(0);
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    const serverUrl = process.env.REACT_APP_SERVER_URL;

    useEffect(() => {
        // 서버에서 데이터를 가져오는 GET 요청을 보냅니다.
        axios.get(`${serverUrl}/orders/list`, { headers })
            .then(response => {
                // GET 요청이 성공하면 서버에서 반환된 데이터를 상태에 설정합니다.
                setOrders(response.data);
            })
            .catch(error => {
                // GET 요청이 실패한 경우 오류 처리를 수행합니다.
                console.error('데이터를 불러오는데 실패했습니다.', error);
            });
    }, [status]);

    function orderHandler(orderId) {
        // 주문을 수정하기 위한 데이터
        const updatedOrderData = {
            orderId,
        };

        axios
            .patch(`${serverUrl}/orders/cash`, updatedOrderData, { headers })
            .then(function (response) {
                // 주문 수정이 성공한 경우의 처리
                alert("결제 상태로 변경 완료하였습니다.", response);
                setStatus(status+1);
            })
            .catch(function (error) {
                // 주문 수정이 실패한 경우의 처리
                alert("결제 상태로 변경 실패하였습니다", error);
            });
    }

    function deliveryStartHandler(orderId) {
        // 주문을 수정하기 위한 데이터
        const updatedOrderData = {
            orderId,
        };

        axios
            .patch(`${serverUrl}/delivery/start`, updatedOrderData, { headers })
            .then(function (response) {
                // 주문 수정이 성공한 경우의 처리
                alert("배송 시작으로 변경하였습니다", response);
                setStatus(status+1);
            })
            .catch(function (error) {
                // 주문 수정이 실패한 경우의 처리
                alert("배송 시작 변경 실패하였습니다", error);
            });
    }
    function deliveryEndHandler(orderId) {
        // 주문을 수정하기 위한 데이터
        const updatedOrderData = {
            orderId,
        };

        axios
            .patch(`${serverUrl}/delivery/end`, updatedOrderData, { headers })
            .then(function (response) {
                // 주문 수정이 성공한 경우의 처리
                alert("배송 완료하였습니다", response);
                setStatus(status+1);
            })
            .catch(function (error) {
                // 주문 수정이 실패한 경우의 처리
                alert("상태 변경 실패하였습니다", error);
            });
    }

const [deliveryStatus, setDeliveryStatus] = useState({});

useEffect(() => {
    // 모든 주문에 대한 배송 정보를 가져오는 로직
    Promise.all(
      orders.map((order) => {
        return axios.get(
          `${serverUrl}/delivery/tracking?order=${order.orderId}`,
          { headers }
        );
      })
    )
      .then((responses) => {
        // 각 주문의 배송 정보를 저장
        const newDeliveryStatus = {};
        responses.forEach((response, index) => {
          newDeliveryStatus[orders[index].orderId] = response.data;
        });
        setDeliveryStatus(newDeliveryStatus);
      })
      .catch((error) => {
        alert("배송 정보를 불러오는 데 실패하였습니다");
      });
  }, [orders]);
    return (
        <Main>
            <Title>
                <h3>주문 관리</h3>
            </Title>
            
            {orders.map((order, index) => (
                <Wrap>
                <div key={index}>
                    <p>회원명 {order.user.userName}</p>
                    <p>세탁내용 {order.clothesCount[0].clothes.clothesName}</p>
                    {deliveryStatus && deliveryStatus[order.orderId]
                  ? deliveryStatus[order.orderId].deliveryStatus === "READY"
                    ? <Button text="배송 준비 중" onClick={()=>{deliveryStartHandler(order.orderId) } } />
                    : deliveryStatus[order.orderId].deliveryStatus === "START"
                      ? <Button text="배송 중" onClick={()=>{deliveryEndHandler(order.orderId) } }/>
                      : deliveryStatus[order.orderId].deliveryStatus === "END"
                        ? <Button text="배송 완료"  />
                        : null
                  : order.orderStatus === "ORDER"
                    ? <Button text="주문 접수 대기 중" onClick={()=>{orderHandler(order.orderId) } } />
                    : order.orderStatus === "CASH"
                      ? <Button text="사용자 결제 대기 중" />
                      : null
                }
                </div>
                </Wrap>
            ))}
            
        </Main>
    );
}

export default Orderctrl;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Title = styled.div`
  border-bottom: solid 1px rgb(232, 234, 237);
  padding: 10px;
`;
const Wrap = styled.div`
border: 1px solid rgb(232, 234, 237);
  width: 300px;
  display: inline-block;
  padding: 12px;
  border-radius: 4px;
  `;
