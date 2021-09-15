const Sequelize = require('sequelize');
const { Op } = require("sequelize");
const db = require('./db')
const Model = Sequelize.Model;

class Article extends Model{
static async newFeed(){
    return Article.findAll();
}

static async FindAllToSendEmail(){
  return Article.findAll();
}
static async findByHost(host){
  return Article.findAll({
    where:{
      nguon: {[Op.like]: '%'+host},
    }
  });
}
static async findByCovid_19(host){
  return Article.findAll({
    where:{
      title: {[Op.like]:{ [Op.any]: ['%C%-19%', '%nCoV%']}},
      nguon: {[Op.like]: '%'+host},
    }
  });
}

}

Article.init({
  link:{
      type: Sequelize.STRING,
      allowNull: false, 
      unique: true,
  },
  // attributes
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  publishedAt: {
    type: Sequelize.DATE,
  },
  nguon: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'article',
});


module.exports = Article;

