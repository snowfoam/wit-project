const mongoose = require("mongoose")
const Schema = mongoose.Schema

const User = mongoose.model("User", new Schema({ 
  email: String, 
  password: String,
  last_login: Date,
  status: {type: Number,default: 0},
  socketid: String,
  created:{type: Date,default: Date.now},
  nickName: String,
  avator: {type: String,default: "https://img.yzcdn.cn/vant/cat.jpeg"},
  sex: String,
  age: String,
  level: {type: Number, default: 1},
  signature: {type: String, default: "Nothing..."},
  favor:String,
  friends:[{type:Schema.Types.ObjectId,ref:"User"}],
  isAdmin:{type: Boolean, default: false}
}))


module.exports = User
