import React from 'react';
import { useSelector } from 'react-redux';
import './chatonline.css';
const ChatOnline = () => {
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  return (
    <div className="chatOnline">
      <div className="chatOnlineFriend">
        <div className="chatOnlineImgContainer">
          <img className="chatOnlineImg" src={userInfo.image} alt="" />
          <div className="chatOnlineBadge"></div>
        </div>
        <span className="chatOnlineName">{userInfo.name}</span>
      </div>
    </div>
  );
};

export default ChatOnline;
