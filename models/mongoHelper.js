var mongodb = require("mongodb");
var MongoClient = mongodb.MongoClient;
var connStr = "mongodb://localhost:27017";

let db;

function _connect(){
    return new Promise((resolve,reject)=>{
        if(!db){
            mongodb.connect(connStr,{ useNewUrlParser: true , useUnifiedTopology: true},(err,client) =>{
                if(!err){
                    db = client.db("restful-api-prod");
                    resolve(db);
                }
                else reject(err);
            })
        }
        else resolve(db);
    })
}

//#region 插入
/***********************插入*******************************/
/**
 * 插入一个文档
 * @param {String} collection 集合名
 * @param {String} obj 对象
 */
function insertOne(collection,obj){
    return new Promise((resolve,reject) => {
        _connect().then(dbClient => {
            dbClient.collection(collection).insertOne(obj,(err,result) => {
                if(!err){
                    resolve(result);
                    return;
                }
                reject(err);
            });
        });
    });
}

/**
 * 插入多个对象
 * @param {String} collection 集合名
 * @param {any} arr 对象数组
 */
function insertMany(collection,arr){
    return new Promise((resolve,reject) => {
        _connect().then(dbClient => {
            dbClient.collection(collection).insertMany(arr,(err,result) => {
                if(!err){
                    resolve(result);
                    return;
                }
                reject(err);
            })
        })
    })
}
//#endregion

//#region 查找
/*********************查找**********************************/
/**
 * 查找对象
 * @param {String} collection 集合名
 * @param {String} json 查询Json
 */
function find(collection,json){
    return new Promise((resolve,reject) => {
        _connect().then(dbClient => {
            dbClient.collection(collection).find(json).toArray((err,data) => {
                if(!err){
                    resolve(data);
                    return;
                }
                reject(err);
            })
        })
    })
}

/**
 * 查找一条记录
 * @param {String} collection 集合名
 * @param {String} json 查询Json
 */
function findOne(collection,json){
    return new Promise((resolve,reject) => {
        _connect().then(dbClient => {
            dbClient.collection(collection).findOne(json,(err,data) => {
                if(!err){
                    resolve(data);
                    return;
                }
                reject(err);
            })
        })
    })
}

/**
 * 根据ID来查找记录
 * @param {String} collection 集合名
 * @param {Number} id id
 */
function findOneById(collection,id){
    return new Promise((resolve,reject) => {
        _connect().then(dbClient => {
            dbClient.collection(collection).findOne({_id:mongodb.ObjectId(id)},(err,data) => {
                if(!err){
                    resolve(data);
                    return;
                }
                reject(err);
            })
        })
    })
}
//#endregion

//#region 修改
/*********************修改******************************************/
/**
 * 更新一个对象
 * @param {string} collection 集合名
 * @param {string} condition 条件
 * @param {string} update 更新对象
 */
function updateOne(collection,condition,update){
    return new Promise((resolve,reject) => {
        _connect().then(dbClient => {
            dbClient.collection(collection).updateOne(condition,update,(err,data) => {
                if(!err){
                    resolve(data);
                    return;
                }
                reject(err);
            })
        })
    })
}

/**
 * 根据id更新一个对象
 * @param {string} collection 集合名
 * @param {number} id id
 * @param {string} update 更新对象
 */
function updateOneById(collection,id,update){
    return new Promise((resolve,reject) => {
        _connect().then(dbClient => {
            dbClient.collection(collection).updateOne({_id:mongodb.ObjectId(id)},update,(err,data) => {
                if(!err){
                    resolve(data);
                    return;
                }
                reject(err);
            })
        })
    })
}

/**
 * 更新多个对象
 * @param {string} collection 集合名
 * @param {string} condition 条件
 * @param {string} update 更新对象
 */
function updateOne(collection,condition,update){
    return new Promise((resolve,reject) => {
        _connect().then(dbClient => {
            dbClient.collection(collection).updateMany(condition,update,(err,data) => {
                if(!err){
                    resolve(data);
                    return;
                }
                reject(err);
            })
        })
    })
}
//#endregion

//#region 删除
/**********************删除**************************************/
/**
 * 删除一个文档
 * @param {string} collection 集合名
 * @param {string} condition 条件
 */
function deleteOne(collection,condition){
    return new Promise((resolve,reject) => {
        _connect().then(dbClient => {
            dbClient.collection(collection).deleteOne(condition,(err,result) => {
                if(!err){
                    resolve(result);
                    return;
                }
                reject(err);
            })
        })
    })
}

/**
 * 根据id删除一个文档
 * @param {string} collection 集合名
 * @param {number} id id
 */
function deleteOneById(collection,id){
    return new Promise((resolve,reject) => {
        _connect().then(dbClient => {
            dbClient.collection(collection).deleteOne({_id: mongodb.ObjectId(id)},(err,result) => {
                if(!err){
                    resolve(result);
                    return;
                }
                reject(err);
            })
        })
    })
}

/**
 * 删除多个文档
 * @param {string} collection 集合名
 * @param {string} condition 条件
 */
function deleteMany(collection,condition){
    return new Promise((resolve,reject) => {
        _connect().then(dbClient => {
            dbClient.collection(collection).deleteMany(condition,(err,result) => {
                if(!err){
                    resolve(result);
                    return;
                }
                reject(err);
            })
        })
    })
}
//#endregion

module.exports = {
    insertOne,
    insertMany,
    find,
    findOne,
    findOneById,
    updateOne,
    updateOneById,
    deleteOne,
    deleteOneById,
    deleteMany
}