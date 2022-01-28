import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcrypt';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        id_user: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        phone: Sequelize.STRING,
        user_role: Sequelize.INTEGER,
        active: Sequelize.BOOLEAN,
        password_hash: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
      },
      {
        sequelize,
        freezeTableName: 'users',
        tableName: 'users',
      }
    );
    this.addHook('beforeSave', async user => {
      // eslint-disable-next-line no-param-reassign
      user.password_hash = await bcrypt.hash(user.password, 8);
    });
    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
