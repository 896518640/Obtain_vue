const mongoose = require("mongoose")

//连接数据库
mongoose.connect(
    "mongodb://localhost:27017/demo"
).then(()=>{
    console.log("student -- 数据库连接成功");
}).catch(e=>{
    console.log("student -- 数据库连接失败");
})
let Schema = mongoose.Schema
let studentSchema = new Schema({
//学号
stunum:{
    type:Number,
    required:true
},
name:{
    type:String,
    required:true
},

//入学时间
admissiondate:{
    type:String,
    required:true
},
//手机号码
phone:{
    type:Number,
    required:true
},
//授课教师
teacher:{
    type:String,
    required:true
},
// 所在班级
class:{
    type:String,
    required:true
},
//工作单位
job:{
    type:String
},
//薪资待遇
money:{
    type:String
}
})
/* let studentDB = mongoose.model('student',studentSchema)
studentDB.create({
    stunum:01,
    name:"小明",
    teacher:"张三",
    admissiondate:"2021-03-13",
    phone:110,
    class:'b0332',
    job:"阿里巴巴",
    money:"20k"
})
studentDB.create({
    stunum:02,
    name:"小东",
    teacher:"蓝睿智",
    admissiondate:"2021-03-13",
    phone:17605589076,
    class:'b0332',
    job:"字节跳动",
    money:"30k"
})
studentDB.create({
    stunum:04,
    name:"涛桑",
    teacher:"蓝睿智",
    admissiondate:"2021-03-13",
    phone:1255761702,
    class:'b0332',
    job:"字节跳动",
    money:"30k"
}) */

module.exports = mongoose.model('student',studentSchema)

