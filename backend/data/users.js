import bcrpty from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    image: '/images/profile-3.jpg',
    password: bcrpty.hashSync('12345', 10),
    role: 'publisher',
  },
  {
    name: 'zwf',
    email: 'zwf@example.com',
    image: '/images/profile-1.jpg',
    password: bcrpty.hashSync('12345', 10),
  },
  {
    name: 'zwr',
    email: 'zwr@example.com',
    image: '/images/profile-2.jpg',
    password: bcrpty.hashSync('12345', 10),
  },
];
export default users;
