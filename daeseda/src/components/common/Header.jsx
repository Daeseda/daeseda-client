import React from "react";
import styled from "styled-components";
import Logo from '../../assets/images/logo.png';

const Container = styled.div`
  padding-left: 20%;
  padding-right: 20%;
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

  @media (max-width: 768px) {
    margin-bottom: 10px; /* 화면이 작아질 때 로고 아래 여백 추가 */
  }
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

  @media (max-width: 768px) {
    margin-top: 10px; /* 화면이 작아질 때 메뉴 위 여백 추가 */
  }
`;

const NavItem = styled.li`
  display: inline-block;
  margin-left: 20px;

  @media (max-width: 768px) {
    margin: 5px 0;
  }
`;

const NavLink = styled.a`
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

  &:hover {
    background: #5D8DF2;
    color: white;
    border: none;
  }

  @media (max-width: 768px) {
    width: 100%; /* 화면이 작아질 때 버튼을 가득 채우도록 너비 조정 */
    margin-top: 10px; /* 화면이 작아질 때 버튼 위 여백 추가 */
  }
`;


const Header = () => {
  return (
    <Container>
            <Navbar>
            <LogoImage src={Logo} alt="" />
              대신 세탁해드립니다
                <Nav>
                
                    <NavList>
                        <NavItem><NavLink href="">신청하기</NavLink></NavItem>
                        <NavItem><NavLink href="">이용방법</NavLink></NavItem>
                        <NavItem><NavLink href="">고객센터</NavLink></NavItem>
                        <NavItem><NavLink href="">내정보</NavLink></NavItem>
                        <NavItem><NavLink href="">주문내역</NavLink></NavItem>
                        <NavItem><NavLink href=""><Login>로그인</Login></NavLink></NavItem>
                    </NavList>
                </Nav>
                
            </Navbar>
            
        </Container>
  );
};

export default Header;