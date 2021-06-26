import mongoose from 'mongoose';

const ConversationSchema = mongoose.Schema(
  {
    members: {
      type: Array,
    },
  },
  { timestamps: true }
);
const Conversation = mongoose.model('Conversation', ConversationSchema);
export default Conversation;
