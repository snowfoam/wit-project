const app = require("../app")
const request = require("supertest")(app)

let code = ""
let token = ""
// 这里填上非自己的QQ号
let email = "3605835940@qq.com"
let femail = "111@qq.com"

// 提前创建两个用户 将信息存在这里
let test1 = "112233445@qq.com"
let test2 = "223344556@qq.com"
let test3 = "1223344556@qq.com"

let testToken1 = ""
let testToken2 = ""
let from = ""
let to = ""
// 申请好友的id
let id = ""

describe("auth test", () => {
  // 发送验证码测试 
  it("POST /auth/code test", done => {
    request
      .post("/auth/code")
      .set("Content-Type","application/json")
      .set("Authorization","Bearer ")
      .send({
        email
      })
      .expect(200)
      .end((err,res) => {
        code = res.header["set-cookie"][0].substr(5,4)
        if(err) return done(err)
        done()
      })
  })
  // 验证验证码
  it("POST /auth/checkCode test", done =>{
    request
      .post("/auth/checkCode")
      .set("Cookie",JSON.stringify({code}))
      .set("Content-Type","application/json")
      .send({
        code
      })
      .expect(200)
      .end((err) => {
        if(err) return done(err)
        done()
      })
  })
  // 注册测试
  it("POST /auth/signup test", done => {
    request
      .post("/auth/signup")
      .set("Content-Type","application/json")
      .set("Authorization","Bearer ")
      .send({
        email,
        password: "aa123456aa",
        nickName: "test",
        sex: "male",
        age: 18,
        favor: "favor",
        signature: "signature"
      })
      .expect(200)
      .end((err) => {
        if(err) return done(err)
        done()
      })
  })
  it("POST /auth/signin false test", done => {
    request
      .post("/auth/signin")
      .set("Content-Type","application/json")
      .set("Authorization","Bearer ")
      .send({
        femail,
        password: "aa123456aa"
      })
      .expect(404)
      .end((err,res) => {
        token = res.body.token
        if(err) return done(err)
        done()
      })
  })
  it("POST /auth/signin test", done => {
    request
      .post("/auth/signin")
      .set("Content-Type","application/json")
      .set("Authorization","Bearer ")
      .send({
        email,
        password: "aa123456aa"
      })
      .expect(200)
      .end((err,res) => {
        token = res.body.token
        if(err) return done(err)
        done()
      })
  })

})
describe("user test", () => {
  // 获取所有用户信息
  it("GET /user test", done => {
    request
      .get("/user")
      .set("Content-Type","application/json")
      .set("Authorization","Bearer " + token)
      .expect(200)
      .end((err) => {
        if(err) return done(err)
        done()
      })
  })
  it("GET /user/token test", done => {
    request
      .get("/user/token")
      .set("Content-Type","application/json")
      .set("Authorization","Bearer " + token)
      .expect(200)
      .end((err) => {
        if(err) return done(err)
        done()
      })
  })
  it("GET /user/:email failtest", done => {
    request
      .get(`/user/${femail}`)
      .set("Content-Type","application/json")
      .set("Authorization","Bearer " + token)
      .expect(404)
      .end((err) => {
        if(err) return done(err)
        done()
      })
  })
  it("GET /user/:email test", done => {
    request
      .get(`/user/${email}`)
      .set("Content-Type","application/json")
      .set("Authorization","Bearer " + token)
      .expect(200)
      .end((err) => {
        if(err) return done(err)
        done()
      })
  })
  it("PUT /userinfo test", done => {
    request
      .put("/user/userinfo")
      .set("Content-Type","application/json")
      .set("Authorization","Bearer " + token)
      .send({
        signature: "Something ...."
      })
      .expect(200)
      .end((err) => {
        if(err) return done(err)
        done()
      })
  })
  it("DELETE /user/:email failtest", done => {
    request
      .delete(`/user/${femail}`)
      .set("Content-Type","application/json")
      .set("Authorization","Bearer " + token)
      .expect(200)
      .end((err) => {
        if(err) return done(err)
        done()
      })
  })
  it("DELETE /user/:email test", done => {
    request
      .delete(`/user/${email}`)
      .set("Content-Type","application/json")
      .set("Authorization","Bearer " + token)
      .expect(200)
      .end((err) => {
        if(err) return done(err)
        done()
      })
  })
})
// 创建测试账号
describe("create user", () => {
  it("POST /auth/signup test", done => {
    request
      .post("/auth/signup")
      .set("Content-Type","application/json")
      .send({
        email:test1,
        password: "aa123456aa",
        nickName: "test",
        sex: "male",
        age: 18,
        favor: "favor",
        signature: "signature"
      })
      .expect(200)
      .end((err) => {
        if(err) return done(err)
        done()
      })
  })
  it("POST /auth/signup test", done => {
    request
      .post("/auth/signup")
      .set("Content-Type","application/json")
      .send({
        email:test2,
        password: "aa123456aa",
        nickName: "test",
        sex: "male",
        age: 18,
        favor: "favor",
        signature: "signature"
      })
      .expect(200)
      .end((err) => {
        if(err) return done(err)
        done()
      })
  })
  it("POST /auth/signin test", done => {
    request
      .post("/auth/signin")
      .set("Content-Type","application/json")
      .send({
        email:test1,
        password: "aa123456aa"
      })
      .expect(200)
      .end((err,res) => {
        testToken1 = res.body.token
        if(err) return done(err)
        done()
      })
  })
  it("POST /auth/signin test", done => {
    request
      .post("/auth/signin")
      .set("Content-Type","application/json")
      .send({
        email:test2,
        password: "aa123456aa"
      })
      .expect(200)
      .end((err,res) => {
        testToken2 = res.body.token
        if(err) return done(err)
        done()
      })
  })
  it("GET /user/token test", done => {
    request
      .get("/user/token")
      .set("Content-Type","application/json")
      .set("Authorization","Bearer " + testToken1)
      .expect(200)
      .end((err,res) => {
        from = res.body.data.user._id
        if(err) return done(err)
        done()
      })
  })
  it("GET /user/token test", done => {
    request
      .get("/user/token")
      .set("Content-Type","application/json")
      .set("Authorization","Bearer " + testToken2)
      .expect(200)
      .end((err,res) => {
        to = res.body.data.user._id
        if(err) return done(err)
        done()
      })
  })
})

describe("message test",() => {
  it("GET /message test", done => {
    request
      .get("/message")
      .set("Content-Type","application/json")
      .set("Authorization","Bearer " + testToken1)
      .expect(200)
      .end((err) => {
        if(err) return done(err)
        done()
      })
  })
})
describe("friend test",() => {
  it("POST /friend/create test", done => {
    request
      .post("/friend/create")
      .set("Content-Type","application/json")
      .set("Authorization","Bearer " + testToken1)
      .send({
        to,message:"Add",source:"Search"
      })
      .expect(200)
      .end((err) => {
        if(err) return done(err)
        done()
      })
  })
  it("GET /friend test", done => {
    request
      .get("/friend")
      .set("Content-Type","application/json")
      .set("Authorization","Bearer " + testToken1)
      .expect(200)
      .end((err,res) => {
        id = res.body.data[0]._id
        if(err) return done(err)
        done()
      })
  })
  it("PUT /friend/:id test", done => {
    request
      .put(`/friend/${id}`)
      .set("Content-Type","application/json")
      .set("Authorization","Bearer " + testToken1)
      .send({
        status: 1
      })
      .expect(200)
      .end((err) => {
        if(err) return done(err)
        done()
      })
  })
})

describe("chat test",() => {
  it("GET /chat/:userId/:otherUserId test", done => {
    request
      .get(`/chat/${from}/${to}`)
      .set("Content-Type","application/json")
      .set("Authorization","Bearer " + testToken1)
      .expect(200)
      .end((err) => {
        if(err) return done(err)
        done()
      })
  })
  it("POST /chat/send test", done => {
    request
      .post("/chat/send")
      .set("Content-Type","application/json")
      .set("Authorization","Bearer " + testToken1)
      .send({
        userId:from,otherUserId:to,message: "Test"
      })
      .expect(200)
      .end((err) => {
        if(err) return done(err)
        done()
      })
  })
})
// 删除测试用例
describe("delete test", () => {
  it("DELETE /user/:email test", done => {
    request
      .delete(`/user/${test3}`)
      .set("Content-Type","application/json")
      .set("Authorization","Bearer " + testToken1)
      .expect(200)
      .end((err) => {
        if(err) return done(err)
        done()
      })
  })
  it("DELETE /user/:email test", done => {
    request
      .delete(`/user/${test1}`)
      .set("Content-Type","application/json")
      .set("Authorization","Bearer " + testToken1)
      .expect(200)
      .end((err) => {
        if(err) return done(err)
        done()
      })
  })
  it("DELETE /user/:email test", done => {
    request
      .delete(`/user/${test2}`)
      .set("Content-Type","application/json")
      .set("Authorization","Bearer " + testToken1)
      .expect(200)
      .end((err) => {
        if(err) return done(err)
        done()
      })
  })
})







