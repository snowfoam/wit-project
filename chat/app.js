const createError = require("http-errors")
const express = require("express")
const path = require("path")
const cookieParser = require("cookie-parser")
const logger = require("morgan")
const mongoose = require("mongoose")
const expressJwt = require("express-jwt")
const config = require("./config")
//const socketIo = require("socket.io")
//const socketHander = require("./socket")
let indexRouter = require("./routes/index")

let app = express()
const cors = require("cors")

mongoose.set("useFindAndModify", false)
var corsOptions = {
  origin: "http://localhost:8080",
  credentials: true,
  maxAge: "1728000"
}
app.use(cors(corsOptions))


var secret = "secret"
// view engine setup
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({
  extended: false
}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))

app.use(expressJwt({
  secret
}).unless({
  path: ["/auth/signup", "/auth/signin", "/","/auth/code","/auth/checkCode"]
}))
app.use("/", indexRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get("env") === "development" ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render("error")
})

mongoose.connect(`${config.db}`,{useUnifiedTopology: true,useNewUrlParser: true})
// mongoose.connection.on('error', function (error) {
//   console.log('数据库连接失败:' + error);
// });
// mongoose.connection.on('open', function () {
//   console.log('——数据库连接成功！——');
// });

// socketIo.on('connection',(socket) => {
//   const socketId = socket.id
//   // 监听用户登录
//   socket.on('login', userId => {
//     socketHander.saveUserSocketId(userId,socketId)
//   })

//   // 监听用户刷新
//   socket.on('update', userId => {
//     socketHander.saveUserSocketId(userId,socketId)
//   })

//   // 用户发送私聊消息
//   socket.on('sendPrivateMessage', async (data) => {
//     const {to} = data
//     const socketId = await socketHander.getUserSocketId(to)
//     io.to(socketid).emit('receivePrivateMessage',data)
//   })

//   // 用户发送群消息
//   socket.on('sendGroupMessage', async (data) => {
//     io.sockets.emit('receiveGroupMessage',data)
//   })

//   socket.on('changeUser', async (data) => {
//     const { currentUserId,userId } = data
//     await socketHander.changeUser(currentUserId,userId,socketId)
//   })
// })

module.exports = app