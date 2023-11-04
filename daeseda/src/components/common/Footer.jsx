import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import {faRecycle, faShower, faPhone} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Container = styled.div`
  background: #5d8df2;
  height: 350px;
  display: flex;
  flex-direction: column;
  color: white;
  @media (max-width: 768px) {
    margin: 0 10px;
    font-size: 14px;
  }
`;
const Image = styled.img`
  width: 30%;
  height: 50px;
`;
const Content = styled.div`
  display: flex;
  justify-content: space-between;
  margin:0 10px;
`;
const LogoImage = styled.img`
  width: 50px;
`;
const Leftcontent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;
const Rightcontent = styled.div`
margin-top:20px;
  display: flex;
  align-items:flex-start;
  gap: 20px;
  font-size:18px;
  @media (max-width: 768px) {
    flex-direction:column;
    margin-bottom:20px;
  }
`;
const NavItem = styled.li`
  display: flex;
  align-items:center;
`;
const LogoLink = styled(Link)`
  @media (max-width: 768px) {
    width: 100%; /* 화면이 작아질 때 버튼을 가득 채우도록 너비 조정 */
  }
`;
const NavLink = styled.p`
  display: flex;
  text-decoration: none;
  color: white;
  font-size: 15px;
  margin-left:5px;
  &:hover {
    text-decoration: underline;
  }
`;

const Footer = () => {
  const navigate = useNavigate();
  const linkHandler = (value) => () => {
    navigate(`/${value}`);
  };
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태
  useEffect(() => {
    const token = localStorage.getItem("token"); // 로컬 스토리지에서 토큰을 가져옴
    if (token) {
      // 토큰이 존재하는 경우, 로그인 상태로 설정
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <Container>
      <Content>
        <Leftcontent>
          <LogoLink
            to="/"
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          >
            <LogoImage src={Logo} alt="로고" />
            <p>대신 세탁해드립니다</p>
          </LogoLink>
          <p>㈜대세다</p>
          <p>daeseda1@gmail.com</p>
          <p>©Daeseda. Corp</p>
        </Leftcontent>

        <Rightcontent>
          <NavItem>
            <FontAwesomeIcon icon={faShower} />
            {isLoggedIn ? (
              <NavLink onClick={linkHandler("laundry")}>신청하기</NavLink>
            ) : (
              <Link to="/login">
                <NavLink>신청하기</NavLink>
              </Link>
            )}
          </NavItem>
          <NavItem>
            <FontAwesomeIcon icon={faRecycle} />
            <NavLink onClick={linkHandler("userGuide")}>이용방법</NavLink>
          </NavItem>
          <NavItem>
          <FontAwesomeIcon icon={faPhone} />
            <NavLink onClick={linkHandler("cscenter")}>고객센터</NavLink>
          </NavItem>

          <NavItem>
          <FontAwesomeIcon icon={faGithub} />
            <NavLink onClick={()=>{
              window.open("https://github.com/Daeseda",'_blank')
            }}>GitHub</NavLink>
          </NavItem>


        </Rightcontent>
      </Content>
    </Container>
  );
};

export default Footer;
