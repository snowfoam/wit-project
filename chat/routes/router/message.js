const express = require("express")
const router = express.Router()

const MessageUser = require("../../models/messageUser")
const Group = require("../../models/group")

// 获取该用户的所有聊天信息
router.get("/", async (req, res) => {
  let {
    user: {
      _id
    }
  } = req.user
  // 获取私聊消息
  let userMessage = await MessageUser.find({$or: [{from: _id},{to: _id}]}).populate("from to")
  // 获取群聊消息
  let groupMessage = await Group.find({members:{$elemMatch:{$eq: _id}}}).populate("messages")
  res.status(200).json({
    data: {user: userMessage,group: groupMessage},
    message: "success",
    code: 200
  })
})

module.exports = router