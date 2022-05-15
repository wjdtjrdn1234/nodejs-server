const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({ //첫번쨰인수 :column 정의 
      name: {
        type: Sequelize.STRING(20), //mysql에선 varchar
        allowNull: false, //not null -> 필수
        unique: true,
      },
      age: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      married: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      comment: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE, //DATE =  mysql에서 DATETIME // DataOnly = mysql에서 DATE
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    }, {//두번째인수: 모델에 대한 설정
      sequelize,
      timestamps: false, //true면 createAt,updateAt를 넣어줌(생성,수정시간) 
      underscored: false, //created_at , createdAt 할지 (우리는 created_at를 수동으로 설정했지만 , 자동으로 생성하는경우)
      modelName: 'User',
      tableName: 'users', //시퀄라이즈는 모델명을 소문자+복수해서 테이블명을 정함
      paranoid: false, //true면 deleteAt 생성 ,soft delete //<->아얘삭제:hard delete
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.User.hasMany(db.Comment, { foreignKey: 'commenter', sourceKey: 'id' });
  }
};
//id는 자동으로 생성됨