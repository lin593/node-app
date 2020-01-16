var mongoose = require("mongoose");
mongoose.set("useCreateIndex",true);
mongoose.connect("mongodb://dbroot:Milan123456@localhost:27017",{dbName:'SKHB', useNewUrlParser: true , useUnifiedTopology: true});
const migrate = require("../controller/sqlToDucument")

var db = mongoose.connection;
db.on("error",console.error.bind(console,'An error occurred while mongoose connect to mongodb:'));
db.once("open",/*async*/ function(){
    // 连接成功
    module.exports.IsConnected = true;
    console.log("connect to mongoose");

    // 定义数据库模型
    // XXX
    // let XXXSchema = new mongoose.Schema({

    // })
    // module.exports.XXX = mongoose.model('XXX',XXXSchema);

    // CustomRoom
    let CustomRoomSchema = new mongoose.Schema({
        room: Number,
        dividentRate: Number,
        rentDays: Number,
        estimationEndTime: Number,
        pledgedTre: Number
    })
    module.exports.CustomRoom = mongoose.model('customRooms',CustomRoomSchema);

    // Deposit
    let DepositSchema = new mongoose.Schema({
        account: String,
        trx: Number,
        eth: Number,
        hash: { type: String, unique: true },
        time: Number,
        status: String
    })
    module.exports.Deposit = mongoose.model('deposits',DepositSchema);

    // DivdentLog
    let DividentLogSchema = new mongoose.Schema({
        account: String,
        tre: Number,
        totalTre: Number,
        dividentTrx: Number,
        dividentPool: Number,
        time: Number
    })
    DividentLogSchema.methods.addDividentLog = function(account, tre, totalTre, dividentTrx, dividentPool, time){
        return new Promise((resolve,reject) => {
            mongoose.model('dividentLogs',DividentLogSchema)
            .create({
                account,
                tre,
                totalTre,
                dividentTrx,
                dividentPool,
                time
            })
            .then(dividentLog => {
                resolve(dividentLog.toJSON());
            })
        })
    }
    module.exports.DividentLog = mongoose.model('dividentLogs',DividentLogSchema);

    // Finance
    let FinanceSchema = new mongoose.Schema({
        account: String,
        type: Number,
        trx: Number,
        time: Number
    })
    module.exports.Finance = mongoose.model('finances',FinanceSchema);

    // Global
    let GlobalSchema = new mongoose.Schema({
        luckyPool:Number,
        dividentPool:Number
    })
    module.exports.Global = mongoose.model('globals',GlobalSchema);

    // Record
    let RecordSchema = new mongoose.Schema({
        redId: Number,
        account: String,
        trx: Number,
        tre: Number
    })
    module.exports.Record = mongoose.model('records',RecordSchema);

    // Red
    let RedSchema = new mongoose.Schema({
        //room: {type:Number, ref:'room'}, //这里为room表的外键，关联主表。  ref后的room代表的是主表room的Model。
        room:Number,
        sender: String,
        trx: Number,
        grabNumber: Number,
        grabTrxList: String,
        grabTreList: String,
        account: String,
        invite: String,
        minIndex: Number,
        startTime: Number,
        endTime: Number,
        profit: Number,
        roomProfit: Number,
        status: Boolean,
    })

    RedSchema.methods.addRed = function(room, sender, trx, grabNumber, grabTrxList, grabTreList, account, minIndex, profit){
        return new Promise((resolve,reject) => {
            mongoose.model('reds',RedSchema)
            .create({
                room,
                sender,
                trx,
                grabNumber,
                grabTrxList,
                grabTreList,
                account,
                minIndex,
                startTime: Date.now(),
                endTime: null,
                profit,
                roomProfit: 0,
                status: 0
            })
            .then(result => {
                resolve(result.toJSON());
            })
        })
    }
    module.exports.Red = mongoose.model('reds',RedSchema);

    // RoomPledge
    let RoomPledgeSchema = new mongoose.Schema({
        account: String,
        trx: Number,
        rentDays: Number,
        customRoom: Number,
        pledgedTre: Number
    })
    module.exports.RoomPledge = mongoose.model('roomPledges',RoomPledgeSchema);

    // RoomRedeem
    let RoomRedeemSchema = new mongoose.Schema({
        account: String,
        customRoom: Number,
        redeemTre: Number,
        penalty: Number
    })
    RoomRedeemSchema.methods.addRoomRedeem = function(account, customRoom, redeemTre, penalty){
        return new Promise((resolve,reject) => {
            mongoose.model('roomRedeems',RoomRedeemSchema)
            .create({
                account,
                customRoom,
                redeemTre,
                penalty
            })
            .then(roomRedeem => {
                resolve(roomRedeem.toJSON());
            })
        }) 
    }
    module.exports.RoomRedeem = mongoose.model('roomRedeems',RoomRedeemSchema);

    // Room
    let RoomSchema = new mongoose.Schema({
        createUser:String,
        redId:Number,
        status:Number,
        trx: Number,
        grabNumber: Number,
        tokenRate: Number,
        addition: Number,
        startTime: Number,
        endTime: Number,
        roomNumber: String
    })
    RoomSchema.methods.addRoom = function(createUser, redId, status, trx, grabNumber, tokenRate, addition, startTime, endTime, roomNumber){
        return new Promise((resolve,reject) => {
            mongoose.model('rooms',RoomSchema)
            .create({
                createUser,
                redId,
                status,
                trx,
                grabNumber,
                tokenRate,
                addition,
                startTime,
                endTime,
                roomNumber
            })
            .then(room => {
                resolve(room.toJSON());
            })
        }) 
    }
    module.exports.Room = mongoose.model('rooms',RoomSchema);

    // Settle
    let SettleSchema = new mongoose.Schema({
        redId: Number,
        status: Boolean
    })
    SettleSchema.methods.addSettle = function(redId, status){
        return new Promise((resolve,reject) => {
            mongoose.model('settles',SettleSchema)
            .create({
                redId,
                tatus
            })
            .then(settle => {
                resolve(settle.toJSON());
            })
        })
    }
    module.exports.Settle = mongoose.model('settles',SettleSchema);

    // SmsCode
    let SmsCodeSchema = new mongoose.Schema({
        phone: { type: String, unique: true },
        smsCode: String,
        time: Number
    })
    module.exports.SmsCode = mongoose.model('smsCodes',SmsCodeSchema);

    // TreInvite
    let TreInviteSchema = new mongoose.Schema({
        account: String,
        playAccount: String,
        redId: Number,
        tre: Number,
        time: Number
    })
    module.exports.TreInvite = mongoose.model('treInvites',TreInviteSchema);

    // TrxInvite
    let TrxInviteSchema = new mongoose.Schema({
        account: String,
        playAccount: String,
        redId: Number,
        trx: Number,
        time: Number
    })
    module.exports.TrxInvite = mongoose.model('trxInvites',TrxInviteSchema);

    // User
    let UserSchema = new mongoose.Schema({
        account: { type: String, unique: true },
        nickname: String,
        phone: { type: String, unique: true },
        password: String,
        level: String,
        balance: Number,
        freezeTrx: Number,
        kceBalance: Number,
        freezeKce: Number,
        ethBalance: Number,
        invite: String,
        inviteNickname: String,
        inviteCode: String,
        status: Number,
        salt: String,
        withdrawTimes: Number,
        regTime: String
    })
    module.exports.User = mongoose.model('users',UserSchema);

    // Wallet
    let WalletSchema = new mongoose.Schema({
        account: { type: String, unique: true },
        address: { type: String, unique: true },
        privateKey: { type: String, unique: true }
    })
    module.exports.Wallet = mongoose.model('wallets',WalletSchema);

    // Withdraw
    let WithdrawSchema = new mongoose.Schema({
        account: String,
        trx: Number,
        eth: Number,
        hash: { type: String, unique: true },
        toAddress: String,
        time: Number
    })
    module.exports.Withdraw = mongoose.model('withdraws',WithdrawSchema);

    //await migrate.StartMigrate();
})
db.on("disconnected",console.log.bind(console,"mongoose disconnected."))