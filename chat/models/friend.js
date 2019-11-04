const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Friend = mongoose.model("friend", new Schema({
  from: {type:Schema.Types.ObjectId,ref:"User"},
  to: {type:Schema.Types.ObjectId,ref:"User"},
  // 0 等待验证 1 已同意 2 已拒绝
  // 0 待处理 1 已同意 2 已拒绝
  status: {type: Number,default: 0},
  // 附加消息
  message: String,
  replay: String,
  source: String,
  created: {
    type: Date,
    default: Date.now
  }
}))

module.exports = Friend