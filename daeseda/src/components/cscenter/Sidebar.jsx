// 내 정보의 왼쪽 사이드바
import styled from "styled-components";
import { useState } from "react";

const sidebarItems = [
  { id: "notice", label: "공지사항" },
  { id: "faq", label: "자주묻는질문" },
  { id: "question", label: "자유게시판" },
];

function Sidebar({sidebarStatus, setSidebarStatus}) {
  const [selectedItem, setSelectedItem] = useState("notice");

  const handleItemClick = (itemId) => {
    setSelectedItem(itemId);
    setSidebarStatus(itemId);
  };

  return (
    <SidebarWrapper>
      {sidebarItems.map((item) => (
        <List
          key={item.id}
          isSelected={selectedItem === item.id}
          onClick={() => handleItemClick(item.id)}
        >
          {item.label}
        </List>
      ))}
    </SidebarWrapper>
  );
}

const SidebarWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1px;
`;

const List = styled.li`
  width: 200px;
  padding: 8px 0;
  border-radius: 5px;
  text-align: center;
  background-color: ${(props) =>
    props.isSelected ? "rgb(93,141,242)" : "rgb(232, 234, 237)"};
  color: ${(props) => (props.isSelected ? "white" : "#111111")};
  cursor: pointer;
`;

export default Sidebar;
