import { Provider } from "react-redux";
import { createStore } from "redux";

let user = {
  login: false,
  userEmail: "",
  userName: "",
  userNickanme: "",
  userPhone: "",
};
// Redux 리듀서 함수를 정의합니다.
function reducer(state = user, action) {
  // "login" 액션이 전달되면 사용자 정보를 업데이트
  if (action.type === "login") {
    return {
      login: true,
      userEmail: action.userInfo.userEmail,
      userName: action.userInfo.userName,
      userNickname: action.userInfo.userNickname,
      userPhone: action.userInfo.userPhone,
    };
  } else if (action.type === "logout") {
    return {
      login: false,
      userEmail: "",
      userName: "",
      userNickname: "",
      userPhone: "",
    };
  } else if (action.type === "nameUpdate") {
    return {
      ...state,
      userName: action.newName,
    };
  } else if (action.type === "nicknameUpdate") {
    return {
      ...state,
      userNickname: action.newNickname,
    };
  } else if (action.type === "phoneUpdate") {
    return {
      ...state,
      userPhone: action.newPhone,
    };
  } else {
    return state;
  }
}

export default createStore(reducer);
