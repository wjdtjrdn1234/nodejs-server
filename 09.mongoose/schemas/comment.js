const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;
const commentSchema = new Schema({
  commenter: { //user와 관계 스키마 1:N
    type: ObjectId, //mongoose.Schema.Types.ObjectId
    required: true,
    ref: 'User', //populate : 시퀄라이즈의 include, mysql의 join 역활
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Comment', commentSchema);

//만약 populate를 안쓰면 나이24 ->25로 수정해야될때 일일히 수정해야됨 (ref안쓰고 commenter에 그냥 실제 user object삽입)
