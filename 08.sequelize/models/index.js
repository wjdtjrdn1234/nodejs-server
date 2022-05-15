const Sequelize = require('sequelize');
const User = require('./user');
const Comment = require('./comment');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
// db.Sequelize = Sequelize;

db.User = User;
db.Comment = Comment;

User.init(sequelize); //sequelize넣어주는이유는 연결객체 이므로 //테이블,모델,시퀄라이즈 연결
Comment.init(sequelize);

User.associate(db);
Comment.associate(db);

module.exports = db;


//mysql ,sequelize, node 연결
//sequelize의 model ===  mysql에서 table