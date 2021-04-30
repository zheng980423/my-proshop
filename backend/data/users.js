import bcrypt from 'bcryptjs';
const users = [
  {
    _id: '5d7a514b5d2c12c7449be042',
    name: 'Admin Account',
    email: 'admin@gmail.com',
    role: 'publisher',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    _id: '5d7a514b5d2c12c7449be043',
    name: 'Publisher Account',
    email: 'publisher@gmail.com',
    role: 'publisher',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    _id: '5d7a514b5d2c12c7449be044',
    name: 'User Account',
    email: 'user@gmail.com',
    role: 'user',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    _id: '5d7a514b5d2c12c7449be045',
    name: 'John Doe',
    email: 'john@gmail.com',
    role: 'publisher',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    _id: '5d7a514b5d2c12c7449be046',
    name: 'Kevin Smith',
    email: 'kevin@gmail.com',
    role: 'publisher',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    _id: '5c8a1d5b0190b214360dc031',
    name: 'Mary Williams',
    email: 'mary@gmail.com',
    role: 'publisher',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    _id: '5c8a1d5b0190b214360dc032',
    name: 'Sasha Ryan',
    email: 'sasha@gmail.com',
    role: 'publisher',
    password: bcrypt.hashSync('123456', 10),
  },

  {
    _id: '5c8a1d5b0190b214360dc040',
    name: 'Sara Kensing',
    email: 'sara@gmail.com',
    role: 'user',
    password: bcrypt.hashSync('123456', 10),
  },
];
export default users;
