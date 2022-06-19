const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model { //Sequelize.Model === mysql table
  static init(sequelize) {
    return super.init({
      email: {
        type: Sequelize.STRING(40),
        allowNull: true,
        unique: true,
      },
      nick: {
        type: Sequelize.STRING(15),
        allowNull: false, //필수
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: true, //소셜로그인시 비밀번호 없을수 있음
      },
      provider: {
        type: Sequelize.STRING(10),
        allowNull: false,
        defaultValue: 'local',//로그인제공자 ex:local,kakao
      },
      snsId: {
        type: Sequelize.STRING(30), //소셜로그인시 snsId
        allowNull: true,
      },
    }, {
      sequelize,
      timestamps: true, //createAt기록
      underscored: false,
      modelName: 'User',
      tableName: 'users',
      paranoid: true, //deleteAt기록
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.User.hasMany(db.Post); //user-post 1:N관계
    db.User.belongsToMany(db.User, { //user간의 관계 -> N:N단계(중간테이블:Follow)
      foreignKey: 'followingId',//foreignKey를 안써주면 userId가 foreignKey가되는데 그러면 누가 Followers,Followings인지 구별x
      as: 'Followers',
      through: 'Follow',
    });
    db.User.belongsToMany(db.User, {
      foreignKey: 'followerId',
      as: 'Followings',
      through: 'Follow',
    });
  }
};
