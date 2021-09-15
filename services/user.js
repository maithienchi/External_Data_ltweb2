
const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const db = require('./db')
const Model = Sequelize.Model;


class User extends Model {
    static async findAllUerNotNull() {
      return User.findAll({
        where:{
          token: null,
        }
      });
    }
    static async findById(id) {
        return User.findByPk(id);
    }
    static async findByEmail(email) {
        return User.findOne({
            where: {
              email,
            }
        });
    }
    static async findByUserName(username) {
      return User.findOne({
          where: {
            username,
          }
      });
  }
    static hashPassword(password){
        return bcrypt.hashSync(password, 10);
    }
    static verifyPassword(password,hashPassword){
        return bcrypt.compareSync(password, hashPassword);
    }
}
User.init({
  // attributes
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  displayName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  token: {
    type: Sequelize.STRING,
  }
}, {
  sequelize: db,
  modelName: 'user',
});

// const users = [
//     { id: 1, username: '1760016', displayName: 'Mai Thiện Chí', password: '$2b$10$ULQEO.0pUKdv9/GAn6K08e27wUUEMFvh7ME2qkcjJaQmh1JLROsnG'},
// ];

module.exports = User;