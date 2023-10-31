import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const Container = styled.div`
  box-sizing: border-box;
  @media (max-width: 768px) {
    padding-left: 10px;
    padding-right: 10px;
  }
`;

const Navbar = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;

  @media (max-width: 768px) {
    flex-direction: column; /* 화면이 작아질 때 세로 정렬 */
  }
`;

const LogoImage = styled.img`
  width: 50px;
  cursor: pointer;
  padding: 10px;
`;

const Nav = styled.nav`
  flex: 1;
  text-align: right;

  @media (max-width: 768px) {
    text-align: center; /* 화면이 작아질 때 가운데 정렬 */
  }
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
`;

const NavItem = styled.li`
  display: inline-block;
  margin-left: 20px;
  @media (max-width: 768px) {
    margin: 5px 10px;
  }
`;

const NavLink = styled.span`
  text-decoration: none;
  color: black;
  font-size: 13px;

  &:hover {
    text-decoration: underline;
  }
`;

const Login = styled.button`
  width: 80px;
  color: black;
  background: white;
  padding: 5px 0;
  border: 1px ridge #bcbcbc;
  border-radius: 3px;
  outline: none;
  box-sizing: border-box;
  &:hover {
    background: #5d8df2;
    color: white;
    border: none;
  }

  @media (max-width: 768px) {
    width: 100%; /* 화면이 작아질 때 버튼을 가득 채우도록 너비 조정 */
    margin-top: 10px; /* 화면이 작아질 때 버튼 위 여백 추가 */
    padding: 5px;
    box-sizing: border-box;
  }
`;
const LogoLink = styled(Link)`
   @media (max-width: 768px) {
    width: 100%; /* 화면이 작아질 때 버튼을 가득 채우도록 너비 조정 */
    
  }
`;
const Header = () => {

  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const navigate = useNavigate();

  const linkHandler = (value) => () => {
    navigate(`/${value}`);
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태

  const logoutHandler = () => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .post(`${serverUrl}/users/logout`, null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(function (response) {
          localStorage.removeItem("token");
          setIsLoggedIn(false);
          navigate("/");
        })
        .catch(function (error) {
          alert("로그아웃에 실패하였습니다");
        });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token"); // 로컬 스토리지에서 토큰을 가져옴
    if (token) {
      // 토큰이 존재하는 경우, 로그인 상태로 설정
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <Container>
      <Navbar>
        <LogoLink
          to="/"
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
          <LogoImage src={Logo} alt="로고" />
          <p>대신 세탁해드립니다</p>
        </LogoLink>
        <Nav>
          <NavList>
            <NavItem>
              {isLoggedIn ? (
                <NavLink onClick={linkHandler("laundry")}>신청하기</NavLink>
              ) : (
                <Link to="/login">
                  <NavLink>신청하기</NavLink>
                </Link>
              )}
            </NavItem>
            <NavItem>
              <Link to="/userguide">
                <NavLink>이용방법</NavLink>
              </Link>
            </NavItem>
            <NavItem>
              
                <Link to="/cscenter">
                  <NavLink>고객센터</NavLink>
                </Link>
              
            </NavItem>
            <NavItem>
              {isLoggedIn ? (
                <NavLink onClick={linkHandler("myinfo")}>내정보</NavLink>
              ) : (
                <Link to="/login">
                  <NavLink>내정보</NavLink>
                </Link>
              )}
            </NavItem>
            <NavItem>
              {isLoggedIn ? (
                <NavLink onClick={linkHandler("orderlist")}>주문내역</NavLink>
              ) : (
                <Link to="/login">
                  <NavLink>주문내역</NavLink>
                </Link>
              )}
            </NavItem>
            <NavItem>
              {isLoggedIn ? (
                <NavLink onClick={logoutHandler}>
                  <Login>로그아웃</Login>
                </NavLink>
              ) : (
                <Link to="/login">
                  <Login>로그인</Login>
                </Link>
              )}
            </NavItem>
          </NavList>
        </Nav>
      </Navbar>
    </Container>
  );
};

export default Header;
