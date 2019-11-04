const express = require("express")
const router = express.Router()
const MessageUser = require("../../models/messageUser")


router
  // 获取用户的私聊消息
  .get("/:userId/:otherUserId",async ( req, res) => {
    const { userId, otherUserId } = req.params
    let result = await MessageUser.find({$or: [
      {
        from: userId,
        to: otherUserId
      },
      {
        from: otherUserId,
        to: userId
      }
    ]}).populate("from to")
    res.status(200).json({
      data: result,
      code: 200,
      message: "Success"
    })
  })
  // 发送消息
  .post("/send",async ( req, res) => {
    const {userId, otherUserId, message} = req.body
    let data = {
      from: userId,
      to: otherUserId,
      message
    }
    const result = await new MessageUser(data).save()
    if( result ) {
      return res.status(200).json({
        code: 200,
        data: null,
        message: "Success"
      })
    }
    res.status(404).json({
      code: 404,
      data: null,
      message: "Error"
    })
  })

module.exports = router
