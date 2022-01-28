const bcrypt = require('bcrypt');

module.exports = {
  async up(QueryInterface) {
    return QueryInterface.bulkInsert(
      'users',
      [
        {
          name: 'admin',
          email: 'admin@admin.com',
          phone: '+52 222 362 1514',
          user_role: 1,
          active: 1,
          password_hash: bcrypt.hashSync('password', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'user',
          email: 'user@user.com',
          phone: '+52 222 362 1514',
          user_role: 0,
          active: 1,
          password_hash: bcrypt.hashSync('password', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down() {
    '';
  },
};
