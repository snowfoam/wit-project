const express = require("express")
const router = express.Router()

const userRouter = require("./router/user")
const authRouter = require("./router/auth")
const friendRouter = require("./router/friend")
const chatRouter = require("./router/chat")
const messageRouter = require("./router/message")

router.get("/", function(req, res) {
  res.render("index", { title: "Express" })
})

router
  .use("/user", userRouter)
  .use("/auth", authRouter)
  .use("/friend", friendRouter)
  .use("/chat", chatRouter)
  .use("/message", messageRouter)

module.exports = router
