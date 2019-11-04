const express = require("express")
const router = express.Router()
const User = require("../../models/user")
const jwt = require("jsonwebtoken")
const config = require("../../config")
const nodeMailer = require("nodemailer")

// 登录
router.post("/signin", async (req, res) => {
  let user = await User.findOne({
    email: req.body.email
  })
  if (user) {
    if (user.password === req.body.password) {
      let token = jwt.sign({
        user
      }, "secret")
      return res.status(200).json({
        message: "Success",
        code: 200,
        token,
        data: null
      })
    } else {
      return res.status(404).json({
        data: null,
        message: "No such user or wrong password!",
        code: 404
      })
    }
  }
  res.status(404).json({
    data: null,
    message: "User does not exist, please register first",
    code: 404
  })
})

// 注册
router.post("/signup", async (req, res) => {
  let data = req.body
  let user = {
    email: data.email,
    password: data.password,
    nickName: data.nickName,
    sex: data.sex,
    age: data.age,
    favor: data.favor,
    signature:data.signature
  }
  await new User(user).save()
  res.status(200).json({
    data: null,
    message: "success",
    code: 200
  })
})

// 发送验证码
router.post("/code", async (req, res) => {
  let {
    email
  } = req.body
  let user = await User.findOne({email})
  if( user ){
    return res.status(404).json({
      data: null,
      code: 404,
      message: "User already exists."
    })
  }
  let transporter = nodeMailer.createTransport({
    host: config.smtp.host,
    port: 587,
    secure: false,
    auth: {
      user: config.smtp.user,
      pass: config.smtp.pass
    }
  })
  let ko = {
    code: config.smtp.code(),
    expire: config.smtp.expire(),
    email: email
  }
  let mailOptions = {
    from: `< ${config.smtp.user} >`,
    to: ko.email,
    subject: config.smtp.subject,
    html: config.smtp.template(ko.code)
  }
  let result = await transporter.sendMail(mailOptions)
  if ( result ) {
    res.cookie("code",ko.code,{maxAge: 1000 * 60})
    res.cookie("email",email,{maxAge: 1000 * 60 * 5})
    return res.status(200).json({
      data: null,
      message: "success",
      code: 200
    })
  }
  res.status(404).json({
    data: null,
    message: "success",
    code: 200
  })

})

// 验证验证码
router.post("/checkCode", async (req, res) => {
  let { code } = req.body
  // let Code = req.cookies.code
  let Code = JSON.parse(req.headers.cookie).code
  code === Code? res.status(200).json({
    data: null,
    code: 200,
    message: "Success"
  }) : res.status(404).json({
    data: null,
    code: 404,
    message: "Incorrect verification code."
  })
})



module.exports = router