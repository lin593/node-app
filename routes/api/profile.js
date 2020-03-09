//登录和注册
const express = require("express");
const router = express.Router(); //接口请求
const passport = require("passport");
const Profile = require("../../models/Profile"); //数据模型 暂时调用不到
const mongoHelper=require("../../models/mongoHelper"); //替代数据模型的调用
var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false)
//$route GET api/Profile/test
//@desc 返回的请求的json数据
//@access public
router.get("/test",(req,res) => {
    res.json({msg:"Profile works"})
})

//$route POST api/profile/add
//@desc 创建信息接口
//@access Private
router.post("/add",passport.authenticate("jwt",{session:false}),async(req,res)=> {
    const profileFields = {};
    if (req.body.type) profileFields.type = req.body.type;
    if (req.body.describe) profileFields.describe = req.body.describe;
    if (req.body.income) profileFields.income = req.body.income;
    if (req.body.expend) profileFields.expend = req.body.expend;
    if (req.body.cash) profileFields.cash = req.body.cash;
    if (req.body.remark) profileFields.remark = req.body.remark;
    console.log(JSON.stringify(profileFields))
    await mongoHelper.insertOne("test2",profileFields);
    return res.status(200).json(profileFields);
    // new Profile(profileFields).save().then(profile => {
    //     res.json(profile);
    // })
})
// @route  POST api/profiles/add
// @desc   创建信息接口
// @access Private
// router.post(
//     '/add',
//     passport.authenticate('jwt', { session: false }),
//     (req, res) => {
//       const profileFields = {};
  
//       if (req.body.type) profileFields.type = req.body.type;
//       if (req.body.describe) profileFields.describe = req.body.describe;
//       if (req.body.income) profileFields.income = req.body.income;
//       if (req.body.expend) profileFields.expend = req.body.expend;
//       if (req.body.cash) profileFields.cash = req.body.cash;
//       if (req.body.remark) profileFields.remark = req.body.remark;
  
//       new Profile(profileFields).save().then(profile => {
//           console.log(profile)
//          res.json(profile);
//       });
//     }
//   );

//$route GET api/profile
//@desc 获取所有信息
//@access Private
router.get("/",passport.authenticate("jwt",{session:false}),(req,res) => {
    mongoHelper.find("test2",'').then(profile => {
        if(!profile) {
            return res.status(404).json('没有任何内容');
        }
        res.json(profile);
    })
    .catch(err => res.status(404).json(err));
})

//$route GET api/profile/:id
//@desc 获取单个信息
//@access Private
router.get("/:id",passport.authenticate("jwt",{session:false}),async(req,res) => {
    mongoHelper.findOne("test2",{_id:req.params.id}).then(profile_id => {
        console.log(req.params.id)
        if(!profile_id) {
            return res.status(404).json('没有任何内容');
        }
        res.json(profile_id);
    })
    .catch(err => res.status(404).json(err));
})


//$route POST api/profile/edit
//@desc 编辑信息接口
//@access Private
router.post("/edit/:id",passport.authenticate("jwt",{session:false}),
  (req,res)=> {
    const profileFields = {};
    if (req.body.type) profileFields.type = req.body.type;
    if (req.body.describe) profileFields.describe = req.body.describe;
    if (req.body.income) profileFields.income = req.body.income;
    if (req.body.expend) profileFields.expend = req.body.expend;
    if (req.body.cash) profileFields.cash = req.body.cash;
    if (req.body.remark) profileFields.remark = req.body.remark;

    // mongoHelper.updateOneById("test2",req.params.id,profileFields)
    // return res.status(200).json(profileFields);
    console.log(JSON.stringify(profileFields))
    console.log(req.params.id)
    mongoHelper.updateOneById("test2",req.params.id,profileFields)
    .then(profile_edit => {
        res.json(profile_edit);
    })
    .catch(err => res.status(404).json(err));
    
    // Profile.findOneAndUpdate(
    //     {_id: req.params.id},
    //     {$set:profileFields},
    //     {new:true}
    // ).then(profile => res.json(profile))
})
//$route POST api/profile/delete:id
//@desc 删除信息接口
//@access Private
router.delete("/delete/:id",passport.authenticate("jwt",{session:false}),(req,res) => {
    // {_id:req.params.id}
    mongoHelper.deleteOneById("test2",req.params.id).then(profile_delet => {
        profile_delet.save().then(profile_delet => res.json(profile_delet))
        // res.json('删除成功') 
    })
    .catch(err => res.status(404).json("删除失败"));
})

module.exports = router;