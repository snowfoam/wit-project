const mongoose = require("mongoose")
const Schema = mongoose.Schema
// eslint-disable-next-line no-unused-vars
const MessageUser = mongoose.model("message_group", new Schema({ 
  from: {type: Schema.Types.ObjectId,ref:"User"},
  message: String,
  created:{type: Date,default: Date.now}
}))

// 返回一个mongo用户库实例
// eslint-disable-next-line no-undef
module.exports = MessageGroup
