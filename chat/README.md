# Assignment 1 - Agile Software Practice.

Name:Yuechen Qi

## Overview.

I want to be a dating system, people can add friends to chat, you can also post daily updates, like facebook.

## API endpoints.
###auth test
 +POST /auth/code - Send the Verification code
 + POST /auth/checkCode- Check the Verification code
 + POST /auth/signup -Register
 + POST /auth/signin-Log in
----------------------------------------------
### user test
+GET /user-Get all users info
+GET /user/token -Obtain user information based on token
+GET /user/ :email-Get user information by email
+PUT /user/userinfo-Update user details
+DELETE /user/:email-Delete users by emails
----------------------------------------------
###Message test
+GET /message-Get all chat information for this user
-----------------------------------------------
###Friend test
+POST /friend/create-Apply to add a friend
+GET /friend-Get new friend's application information
+PUT /friend/:id-Agree / decline application
-----------------------------------------------  
###Chat test
+GET /chat/:id-Get a private chat message from a user
+POST /chat/send-Send a message
-----------------------------------------------
###Delete test
+DELETE /user/:id-Delete a friend by Id
## Data model.

***All database structures are in the models folder
###1.friend
{type:Schema.Types.ObjectId,ref:"User"},
  to: {type:Schema.Types.ObjectId,ref:"User"},
  status: {type: Number,default: 0},
  message: String,
  replay: String,
  source: String,
  created: {
    type: Date,
    default: Date.now
  }
###2. group
name: String,
  introduction: String,
  avator: {type: String,default: "https://img.yzcdn.cn/vant/cat.jpeg"},
  owner: {type:Schema.Types.ObjectId,ref:"User"},
  created:{type: Date,default: Date.now},
  messages: [{type:Schema.Types.ObjectId,ref:"message_group"}],
  members: [{type:Schema.Types.ObjectId,ref:"User"}]
###3.messageuser
from: {type:Schema.Types.ObjectId,ref:"User"},
  to: {type:Schema.Types.ObjectId,ref:"User"},
  isRead: {type: Boolean,default: false},
  created:{type: Date,default: Date.now},
  message: String
###4.user
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

## Sample Test execution.

~~~
 auth test
POST /auth/code 200 3757.285 ms - 44
    √ POST /auth/code test (3776ms)
POST /auth/checkCode 200 0.711 ms - 44
    √ POST /auth/checkCode test
POST /auth/signup 200 11.174 ms - 44
    √ POST /auth/signup test
POST /auth/signin 404 1.454 ms - 79
    √ POST /auth/signin false test
POST /auth/signin 200 3.686 ms - 583
    √ POST /auth/signin test

  user test
GET /user 200 6.429 ms - 327
    √ GET /user test
GET /user/token 200 0.776 ms - 375
    √ GET /user/token test
GET /user/111@qq.com 404 2.027 ms - 79
    √ GET /user/:email failtest
GET /user/3605835940@qq.com 200 1.989 ms - 325
    √ GET /user/:email test
PUT /user/userinfo 200 4.456 ms - 349
    √ PUT /userinfo test
DELETE /user/111@qq.com 200 1.837 ms - 44
    √ DELETE /user/:email failtest
DELETE /user/3605835940@qq.com 200 1.092 ms - 44
    √ DELETE /user/:email test

  create user
POST /auth/signup 200 1.921 ms - 44
    √ POST /auth/signup test
POST /auth/signup 200 1.372 ms - 44
    √ POST /auth/signup test
POST /auth/signin 200 1.384 ms - 582
    √ POST /auth/signin test
POST /auth/signin 200 1.403 ms - 582
    √ POST /auth/signin test
GET /user/token 200 0.532 ms - 374
    √ GET /user/token test
GET /user/token 200 0.533 ms - 374
    √ GET /user/token test

  message test
GET /message 200 3.445 ms - 62
    √ GET /message test

  friend test
POST /friend/create 200 1.959 ms - 44
    √ POST /friend/create test
GET /friend 200 8.564 ms - 796
    √ GET /friend test
PUT /friend/5dc07d5e66bfd2318890a172 200 7.214 ms - 44
    √ PUT /friend/:id test

  chat test
GET /chat/5dc07d5e66bfd2318890a170/5dc07d5e66bfd2318890a171 200 1.552 ms - 42
    √ GET /chat/:userId/:otherUserId test
POST /chat/send 200 2.022 ms - 44
    √ POST /chat/send test

  delete test
DELETE /user/1223344556@qq.com 200 0.900 ms - 44
    √ DELETE /user/:email test
DELETE /user/112233445@qq.com 200 0.914 ms - 44
    √ DELETE /user/:email test
DELETE /user/223344556@qq.com 200 0.951 ms - 44
    √ DELETE /user/:email test


  27 passing (4s)


~~~

[ Markdown Tip: By wrapping the test results in fences (~~~), GitHub will display it in a 'box' and preserve any formatting.]

## Extra features.

I independently learned the socket for chatting.

