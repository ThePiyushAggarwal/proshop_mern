const bcryptjs = require('bcryptjs')

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcryptjs.hashSync('123456'),
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: bcryptjs.hashSync('123456'),
  },
  {
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: bcryptjs.hashSync('123456'),
  },
]

module.exports = users
