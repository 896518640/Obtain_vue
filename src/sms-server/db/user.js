const mongoose = require("mongoose")

//连接数据库
mongoose.connect(
    "mongodb://localhost:27017/demo"
).then(()=>{
    console.log("User -- 数据库连接成功");
}).catch(e=>{
    console.log("User -- 数据库连接失败");
})
let Schema = mongoose.Schema
let UserSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    nickname:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    token:{
        type:String,
        required:true
    },
    lastLoginPosition:{
        type:String,
        required:false
    }
})

module.exports = mongoose.model('User',UserSchema)

