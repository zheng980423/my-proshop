// import axios from 'axios';
// import { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core';
import axios from 'axios';
import { useEffect, useState } from 'react';

const useStyles = makeStyles(theme => ({
  conversation: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    cursor: 'pointer',
    marginTop: '20px',
    '&:hover': {
      backgroundColor: 'rgb(245, 243, 243)',
    },
  },
  conversationImg: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginRight: '20px',
  },
  conversationName: {
    fontWeight: '500',
    '@media (max-width:780px)': {
      // eslint-disable-line no-useless-computed-key
      display: 'none',
    },
  },
}));
const Conversation = ({ conversation, currentUser }) => {
  const classes = useStyles();
  const [user, setUser] = useState([]);
  // const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const friendId = conversation.members.find(m => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios.get('/api/users/' + friendId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className={classes.conversation}>
      <img className={classes.conversationImg} src={user?.image} alt="" />
      <span className={classes.conversationName}>{user?.name}</span>
    </div>
  );
};
export default Conversation;
