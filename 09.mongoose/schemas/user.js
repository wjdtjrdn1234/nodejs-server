const mongoose = require('mongoose');

const { Schema } = mongoose;
const userSchema = new Schema({
  name: {
    type: String,
    required: true, //기본값 false
    unique: true, //기본값 false
  },
  age: {
    type: Number,
    required: true,
  },
  married: {
    type: Boolean,
    required: true,
  },
  comment: String, //option이 type밖에 없을때는 객체로x , 여기선 required:false  
  createdAt: {
    type: Date,
    default: Date.now, //sequelize에선  sequelize.NOW
  },
});

module.exports = mongoose.model('User', userSchema);
//schema === model

//schema 는 mysql 테이블처럼 정해진 데이터만 들어갈수 있게 강제함 -> nosql이랑 상반되는 기술
//type은 자료형 , require는 필수 여부 , default는 기본값 , unique는 고유여부

//_id는 자동생성 