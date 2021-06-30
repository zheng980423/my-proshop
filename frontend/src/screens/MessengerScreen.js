import { useEffect, useRef, useState } from 'react';
// import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Conversation from '../components/Conversation';
import Message from '../components/message/Message';
import ChatOnline from '../components/chatOnline/ChatOnline';
import axios from 'axios';
import { io } from 'socket.io-client';
const useStyles = makeStyles(theme => ({
  messenger: {
    height: '90vh',
    display: 'flex',
    '@media (max-width:780px)': {
      // eslint-disable-line no-useless-computed-key
      flexDirection: 'column',
      height: '100%',
    },
  },
  chatMenu: {
    flex: '3.5',
  },
  chatBox: {
    flex: '5.5',
  },
  chatOnline: {
    flex: '3',
  },
  chatMenuWrapper: {
    padding: '10px',

    height: '100%',
  },
  chatBoxWrapper: {
    padding: '15px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'space-evenly',
    position: 'relative',
  },
  chatOnlineWrapper: {
    padding: '10px',

    height: '100%',
  },
  chatMenuInput: {
    width: '90%',
    padding: '10px 5px',
    border: 'none',
    borderBottom: '1px solid gray',
  },
  chatBoxTop: {
    height: '65%',
    overflowY: 'scroll',
    paddingRight: '10px',
  },
  chatBoxBottom: {
    marginTop: '5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: ' space-between',
  },
  chatMessageInput: {
    width: '80%',
    height: '90px',
    padding: '10px',
  },
  chatSubmitButton: {
    width: '70px',
    height: '40px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    backgroundColor: 'teal',
    color: 'white',
  },
  noConversationText: {
    position: 'absolute',
    top: '10%',
    fontSize: '50px',
    color: 'rgb(224, 220, 220)',
    cursor: 'default',
  },
}));
const MessengerScreen = ({ history }) => {
  const classes = useStyles();
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const scrollRef = useRef();
  const socket = useRef();
  useEffect(() => {
    if (!userInfo) {
      history.push('/');
    }
  }, [userInfo, history]);
  useEffect(() => {
    socket.current = io('ws://localhost:8900');
    socket.current.on('getMessage', data => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages(prev => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit('addUser', userInfo._id);
    socket.current.on('getUsers', users => {
      console.log(users);
    });
  }, [userInfo]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get('/api/conversation/' + userInfo._id);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [userInfo._id]);
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get('/api/message/' + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);
  const handleSubmit = async e => {
    e.preventDefault();
    const message = {
      sender: userInfo._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      member => member !== userInfo._id
    );

    socket.current.emit('sendMessage', {
      senderId: userInfo._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post('/api/message', message);
      setMessages([...messages, res.data]);
      setNewMessage('');
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      <div className={classes.messenger}>
        <div className={classes.chatMenu}>
          <div className={classes.chatMenuWrapper}>
            <input
              placeholder="Search for friends"
              className={classes.chatMenuInput}
            />
            {conversations.map(c => (
              <div onClick={() => setCurrentChat(c)} key={c._id}>
                <Conversation conversation={c} currentUser={userInfo} />
              </div>
            ))}
          </div>
        </div>
        <div className={classes.chatBox}>
          <div className={classes.chatBoxWrapper}>
            <div className={classes.chatBoxTop}>
              {currentChat ? (
                <>
                  <div className={classes.chatBoxTop}>
                    {messages.map(m => (
                      <div ref={scrollRef} key={m._id}>
                        <Message message={m} own={m.sender === userInfo._id} />
                      </div>
                    ))}
                  </div>

                  <div className={classes.chatBoxBottom}>
                    <textarea
                      className={classes.chatMessageInput}
                      placeholder="write something..."
                      onChange={e => setNewMessage(e.target.value)}
                      value={newMessage}
                    ></textarea>
                    <button
                      className={classes.chatSubmitButton}
                      onClick={handleSubmit}
                    >
                      Send
                    </button>
                  </div>
                </>
              ) : (
                <span className={classes.noConversationText}>
                  Open a conversation to start a chat.
                </span>
              )}
            </div>
          </div>
        </div>
        <div className={classes.chatOnline}>
          <div className={classes.chatOnlineWrapper}>
            <ChatOnline />
          </div>
        </div>
      </div>
    </>
  );
};
export default MessengerScreen;
