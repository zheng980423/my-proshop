import mongoose from 'mongoose';
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: { type: String, default: './assets/defaultImgs/defaultAvatar.png' },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: ['user', 'publisher'],
      default: 'user',
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model('User', userSchema);

export default User;
