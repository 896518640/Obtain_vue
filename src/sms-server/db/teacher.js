const mongoose = require("mongoose")

//连接数据库
mongoose.connect(
    "mongodb://localhost:27017/demo"
).then(()=>{
    console.log("Teacher -- 数据库连接成功");
}).catch(e=>{
    console.log("Teacher -- 数据库连接失败");
})
let Schema = mongoose.Schema
let TeacherSchema = new Schema({
    //工号
    jobnumber:{
        type:Number,
        required:true
    },
    //姓名
    name:{
        type:String,
        required:true
    },
    //角色
    role:{
        type:Number,
        required:true
    },
    //入职时间
    entrydate:{
        type:String,
        required:true
    },
    //电话
    phone:{
        type:Number,
        required:true
    }
})
/* let teacherDB = mongoose.model('Teacher',TeacherSchema)
teacherDB.create({
    jobnumber:05,
    name:"张三",
    role:0,
    entrydate:"2021-03-13",
    phone:110
})
teacherDB.create({
    jobnumber:06,
    name:"王五",
    role:1,
    entrydate:"2015-02-09",
    phone:120
})
teacherDB.create({
    jobnumber:07,
    name:"二楞",
    role:2,
    entrydate:"2021-12-16",
    phone:17605589076
})
teacherDB.create({
    jobnumber:08,
    name:"芭比丘",
    role:3,
    entrydate:"2015-07-19",
    phone:17605589076
})
teacherDB.create({
    jobnumber:01,
    name:"张三",
    role:4,
    entrydate:"2020-01-01",
    phone:17605589076
})
teacherDB.create({
    jobnumber:02,
    name:"王五",
    role:1,
    entrydate:"2017-06-21",
    phone:17605589076
})
teacherDB.create({
    jobnumber:03,
    name:"二楞",
    role:2,
    entrydate:"2021-08-28",
    phone:17605589076
})
teacherDB.create({
    jobnumber:04,
    name:"芭比丘",
    role:4,
    entrydate:"2021-04-10",
    phone:17605589076
})
teacherDB.create({
    jobnumber:09,
    name:"张三",
    role:2,
    entrydate:"2001-08-28",
    phone:17605589076
})
teacherDB.create({
    jobnumber:10,
    name:"王五",
    role:5,
    entrydate:"2021-05-11",
    phone:17605589076
})
teacherDB.create({
    jobnumber:11,
    name:"二楞",
    role:5,
    entrydate:"2021-11-15",
    phone:17605589076
})
teacherDB.create({
    jobnumber:12,
    name:"芭比丘",
    role:5,
    entrydate:"2021-11-17",
    phone:17605589076
})

teacherDB.create({
    jobnumber:13,
    name:"张三",
    role:5,
    entrydate:"2021-07-22",
    phone:17605589076
})
teacherDB.create({
    jobnumber:14,
    name:"王五",
    role:4,
    entrydate:"2021-01-11",
    phone:17605589076
})
teacherDB.create({
    jobnumber:15,
    name:"二楞",
    role:5,
    entrydate:"2099-11-22",
    phone:17605589076
})
teacherDB.create({
    jobnumber:16,
    name:"芭比丘",
    role:3,
    entrydate:"2018-11-22",
    phone:17605589076
})
teacherDB.create({
    jobnumber:17,
    name:"二楞",
    role:3,
    entrydate:"2008-11-22",
    phone:17605589076
})
teacherDB.create({
    jobnumber:18,
    name:"芭比丘",
    role:3,
    entrydate:"2022-11-22",
    phone:17605589076
})
teacherDB.create({
    jobnumber:19,
    name:"张三",
    role:2,
    entrydate:"2021-01-22",
    phone:17605589076
})
teacherDB.create({
    jobnumber:20,
    name:"王五",
    role:2,
    entrydate:"2021-11-19",
    phone:17605589076
})
teacherDB.create({
    jobnumber:21,
    name:"二楞",
    role:2,
    entrydate:"2021-11-29",
    phone:17605589076
})
teacherDB.create({
    jobnumber:22,
    name:"芭比丘",
    role:5,
    entrydate:"2021-11-25",
    phone:17605589076
}) */
module.exports = mongoose.model('Teacher',TeacherSchema)
