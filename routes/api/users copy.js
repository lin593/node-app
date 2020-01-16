//登录和注册
const express = require("express");
const router = express.Router();
const bcrypt  =require("bcryptjs");
const gravatar = require('gravatar');
// const bcrypt = require("bcrypt-nodejs")
const Mongo = require("../../models/User");
const mongoHelper=require("../../models/mongoHelper");

//$route GET api/users/test
//@desc 返回的请求的json数据
//@access public
router.get("/test",(req,res) => {
    res.json({msg:"login works"})
})
//$route POST api/users/register
//@desc 返回的请求的json数据
//@access public
//post 请求需要安装第三方  npm i body-parser

router.post("/register",async(req,res) => {
    //console.log(User)
  var userFind = mongoHelper.findOne("test",{email: req.body.email});
  console.log(req.body)
  //查询数据库中是否拥有邮箱
  userFind.then((user) => {
    console.log(999)
       if(user) {
            return res.status(400).json({email: '邮箱已被注册!'})
       } else {
           const avatar = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'});
           const newUser = new User({
               name: req.body.name,
               email: req.body.email,
               avatar,
               password:req.body.password
           })
           //npm install bcrypt -S 密码加密操作
           bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(newUser.password, salt, async(err, hash) => {
                // Store hash in your password DB.
                if(err) throw err;
                newUser.password = hash;
                console.log('000')
                await mongoHelper.insertOne("test",newUser);
                // newUser.save().then(user => res.json(user))
                //               .catch(err => console.log(err+',mmmm'));
                return res.status(200).json(newUser)
            });
         });
       }
    }).catch(err => console.log(err+',mmmm')).finally(console.log(2));
})
router.post("/login",async(req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    // 查询数据库
    console.log(mongoHelper.findOne("test",{email}))
    console.log(Mongo.User.findOne({email}))

    Mongo.User.findOne({email}).then(user => {
    // mongoHelper.findOne("test",{email}).then(user => {
        if(!user){
            return res.status(404).json({email:'用户不存在'})
        }
        //密码匹配
        bcrypt.compare(password, user.password).then(isMatch =>{
            if(isMatch) {
                res.json({msg:"success"});
            } else {
                return res.status(400).json({password:"密码错误！"});
            }
        })
    })
    
})
module.exports = router;