//创建模型存储数据
var mongoose = require("mongoose");
mongoose.set("useCreateIndex",true);
mongoose.connect("mongodb://localhost:27017",{dbName:'restful-api-prod', useNewUrlParser: true , useUnifiedTopology: true});
const Schema = mongoose.Schema;
var db = mongoose.connection;
db.on("error",console.error.bind(console,'An error occurred while mongoose connect to mongodb:'));
db.once("open",/*async*/ function(){
    // 连接成功
    module.exports.IsConnected = true;
    console.log("connect to mongoose");
    //Create Schema
let UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
    },
    date:{
        type:Date,
        default: Date.now
    },
})
module.exports.User = mongoose.model('users', UserSchema);
})
db.on("disconnected",console.log.bind(console,"mongoose disconnected."))
