import { useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Conversation from '../components/Conversation';
import Message from '../components/message/Message';
import ChatOnline from '../components/chatOnline/ChatOnline';

const useStyles = makeStyles(theme => ({
  messenger: {
    height: '90vh',
    display: 'flex',
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
    justifyContent: 'space-evenly',
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
}));
const MessengerScreen = ({ history }) => {
  const classes = useStyles();
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {
    if (!userInfo) {
      history.push('/');
    }
  }, [userInfo, history]);
  return (
    <>
      <div className={classes.messenger}>
        <div className={classes.chatMenu}>
          <div className={classes.chatMenuWrapper}>
            <input
              placeholder="Search for friends"
              className={classes.chatMenuInput}
            />
            <Conversation />
          </div>
        </div>
        <div className={classes.chatBox}>
          <div className={classes.chatBoxWrapper}>
            <div className={classes.chatBoxTop}>
              <PerfectScrollbar>
                <Message />
                <Message own={true} />
                <Message />
                <Message own={true} />
                <Message />
                <Message own={true} />
                <Message />
                <Message own={true} />
                <Message />
              </PerfectScrollbar>
            </div>
            <div className={classes.chatBoxBottom}>
              <textarea
                className={classes.chatMessageInput}
                placeholder="write something..."
              ></textarea>
              <button className={classes.chatSubmitButton}>Send</button>
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
