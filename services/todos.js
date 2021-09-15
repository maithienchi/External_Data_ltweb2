const Sequelize = require('sequelize');
const db = require('./db')
const User= require('./user');
const Model = Sequelize.Model;

class Todo extends Model{
    async markAsDone(todo){
        this.done=true;
        return this.save();
    }

    static async findAllNotDone(userId){
        return Todo.findAll({
            where:{
                done: false,
                userId,
            }
        });
    }
    static async findDone(userId){
        return Todo.findAll({
            where:{
                done: true,
                userId,
            }
        });
    };
    static async findById(id){
        return Todo.findByPk(id);
    }
    
    static add(name,userId){
        return Todo.create({ name, done: false,userId});
    }
}

Todo.init({
  // attributes
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  done: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
}, {
  sequelize: db,
  modelName: 'todo',
});

User.hasMany(Todo);
Todo.belongsTo(User);

module.exports = Todo;

