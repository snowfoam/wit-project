const express = require("express")
const router = express.Router()

const Friend = require("../../models/friend")
const User = require("../../models/user")

// 申请添加好友
router.post("/create", async (req, res) => {
  let {to, message, source} = req.body
  let from =  req.user.user._id
  await new Friend({
    from,to,message,source
  }).save()
  res.status(200).json({
    data:null,
    message: "Success",
    code: 200
  })
})

// 获取新朋友的申请信息
router.get("/", async(req,res) => {
  let {user:{_id}} = req.user
  // 自己加别人
  let result1 = await Friend.find({from:_id}).populate("to from")
  // 别人加自己
  let result2 = await Friend.find({to:_id}).populate("from to")
  result2 = result2.map(el => {
    let info
    switch(el.status){
    case 0: info = "已发送验证消息";break
    case 1: info = "";break
    case 2: info = "拒绝了你的好友申请"; break
    }
    el.info = info
    return el
  })
  let result = result1.concat(result2).sort((prev, current) => {
    return prev.created < current.created
  })

  res.status(200).json({
    data: result,
    message: "Success",
    code: 200
  })
})

// 同意 / 拒绝申请
router.put("/:id",async (req, res) => {
  let id = req.params.id
  let { status } = req.body
  if( status === 1){
    let friend = await Friend.findByIdAndUpdate(id,{status})
    let from = await User.findById(friend.from)
    let to = await User.findById(friend.to)
    from.friends.push(friend.to)
    to.friends.push(friend.from)
    await from.save()
    await to.save()
    return res.status(200).json({
      data: null,
      code: 200,
      message: "Success"
    })
  } else if( status === 2 ){
    // 不同意
    await Friend.updateOne({_id: id},{status})
    return res.status(200).json({
      data: null,
      code: 200,
      message: "Success"
    })
  }
  res.status(404).json({
    data:null,
    code:404,
    message: "Status error"
  })
  
})







module.exports = router
