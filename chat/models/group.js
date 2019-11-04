const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Group = mongoose.model("group", new Schema({ 
  name: String,
  introduction: String,
  avator: {type: String,default: "https://img.yzcdn.cn/vant/cat.jpeg"},
  owner: {type:Schema.Types.ObjectId,ref:"User"},
  created:{type: Date,default: Date.now},
  messages: [{type:Schema.Types.ObjectId,ref:"message_group"}],
  members: [{type:Schema.Types.ObjectId,ref:"User"}]
}))


module.exports = Group
