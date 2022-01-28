import Sequelize from 'sequelize';
import User from '../app/models/User';
import Category from '../app/models/Category';
import dbConfig from '../config/database';

const models = [User, Category];

class DataBase {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(dbConfig);
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new DataBase();
