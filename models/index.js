const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack',{
  logging: false
});

const User = db.define('user',{
  name: {
    type: Sequelize.STRING,
    allowNull:false,
    validate:{
      notEmpty:true
    }
  },
  email: {
    type: Sequelize.TEXT,
    allowNull:false,
    validate:{
      isEmail:true
    } 
  }
});

const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull:false,
    validate:{
      notEmpty:true
    } 
  },
  slug: {
    type: Sequelize.TEXT,
    allowNull:false,
    validate:{
      notEmpty:true
    } 
  },
  content: {
    type: Sequelize.TEXT,
    allowNull:false 
  },
  status:{
    type: Sequelize.ENUM('open', 'closed'),
    defaultValue:'open'
  }
});

module.exports = {
  db ,Page, User
}