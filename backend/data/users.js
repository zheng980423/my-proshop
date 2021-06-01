import bcrpty from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrpty.hashSync('12345', 10),
    role: 'publisher',
  },
  {
    name: 'zwf',
    email: 'zwf@example.com',

    password: bcrpty.hashSync('12345', 10),
  },
  {
    name: 'zwr',
    email: 'zwr@example.com',
    password: bcrpty.hashSync('12345', 10),
  },
];
export default users;
