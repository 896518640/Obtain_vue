const express = require("express")
const userDB = require("../db/user.js")
let md5 = require("blueimp-md5")
const teacherDB = require("../db/teacher.js")
const studentDB = require("../db/student")
const axios = require("axios")
const fs = require("fs")
const cheerio = require("cheerio")

const router = express.Router()
//注册接口
router.post('/user/register', async (req, res) => {
    //得到前台发来的数据
    let { username, nickname, password } = req.body
    //console.log(username,nickname,password);
    //检测数据库中是否该用户
    let doc = await userDB.findOne({ username })
    //console.log(!doc);
    //数据库中不存在 那么创建该用户
    if (!doc) {
        //进行md5加密
        var token = md5(md5(username) + 'b337')
        userDB.create({ username, nickname, password, token: token })
            .then(() => {
                res.send({
                    code: 0,
                    flag: true,
                    msg: "注册成功"
                })
            })
            .catch((e) => {
                //console.log(e);
                res.send({
                    code: 4,
                    flag: false,
                    msg: "服务器出错"
                })
            })
    } else {
        res.send({
            code: 2,
            flag: false,
            msg: "注册失败，账号已存在哦"
        })
    }

})
//登录
router.post("/user/login", async (req, res) => {
    //得到前台发来的数据
    let { username, password } = req.body
    //console.log(username,password);

    try {
        let doc = await userDB.findOne({ username })
        //console.log('doc',doc);
        if (!doc) {
            return res.send({
                code: 4000,
                flag: false,
                msg: "登陆失败，用户名不存在哦"
            })
        }
        if (doc.password !== password) {
            return res.send({
                code: 4000,
                flag: false,
                msg: "登陆失败，密码错误哦"
            })
        }
        //console.log(doc.token);
        return res.send({
            code: 2000,
            flag: true,
            msg: "登陆成功哦",
            data: {
                token: doc.token
            }
        })
    } catch (e) {
        return res.send({
            code: 3000,
            flag: false,
            msg: "登陆失败，服务器错误哦"
        })
    }
    /* userDB.findOne({
        username,
        password
    },(err,doc)=>{
        if(err){
            return res.status(500).json({
                code:3000,
                flag:false,
                msg:"服务器错误"
            })
        }
        if(!doc){
            return res.status(200).json({
                code:4000,
                flag:false,
                msg:"账号或密码错误"
            })
        }else{
            return res.status(200).json({
                code:2000,
                flag:true,
                msg:"登陆成功",
                "data":{
                    token:doc.token
                }
            })
        }
    }) */
})
//获取用户信息
router.get("/user/userInfo", (req, res) => {
    //获取get请求提交的数据
    var body = req.query;
    console.log('body', body);
    userDB.findOne({
        token: body.token
    }, (err, doc) => {
        console.log('doc', doc);
        console.log('err', err);
        if (err) {
            return res.status(500).json({
                code: 3000,
                flag: false,
                msg: "服务器错误"
            })
        }
        if (!doc) {
            return res.status(200).json({
                code: 4000,
                flag: false,
                msg: "token 不存在"
            })
        }
        return res.status(200).json({
            code: 2000,
            flag: true,
            msg: "获取用户信息成功",
            data: {
                nickname: doc.nickname,
                username: doc.username,
                id: doc._id,
                lastLoginPosition:doc.lastLoginPosition ? doc.lastLoginPosition : "未知"
            }
        })
    })
})
//用户退出登录
router.post("/user/logout", (req, res) => {
    var body = req.body;
    //console.log(body);
    userDB.findOne({
        token: body.token
    }, (err, doc) => {
        console.log("doc", doc);
        //console.log("err", err);
        if (err) {
            return res.status(200).json({
                code: 3000,
                flag: false,
                msg: "服务器错误"
            })
        }
        if (!doc) {
            return res.status(200).json({
                code: 4000,
                flag: false,
                msg: "token 不存在"
            })
        }
        axios({
            url: "http://pv.sohu.com/cityjson?ie=utf-8",
            method: "get",
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36"
            }
        }).then(({ data }) => {
            console.log(data);
            // 加工数据
            // ways1
            /* let data1 = data.replace(/\w{3}\s\w+\s=\s/i,"").replace(/;$/,"")
             data1 = JSON.parse(data1)
             console.log(data1)
             */
            // ways2
             let reg =/\{[\s\S]+\}/g;
             let data2 = data.match(reg)
             data2 = JSON.parse(data2)
             console.log(data2);
             userDB.updateOne({ token: body.token}, { lastLoginPosition: data2.cname })
             .then(doc => {
                 console.log("登录地点更新成功");
             })
             .catch(e => {
                 console.log("登录地点更新失败", e);
             })
        }).catch(e => {
            console.log("获取ip地址失败 远程服务器出错",e);
        })
        return res.status(200).json({
            code: 2000,
            flag: true,
            msg: "退出成功喽，欢迎再回来"
        })
    })
})
//获取教师列表（所有）
router.get("/teacher/list", async (req, res) => {
    teacherDB.find({}, (err, doc) => {
        if (err) {
            res.send({
                code: 3000,
                flag: false,
                msg: "服务器错误"
            })
        }
        console.log(doc);
        let count = doc.length;
        return res.send({
            code: 2000,
            flag: true,
            data: {
                total: count,
                rows: doc
            }
        })
    })
})
//获取教师列表（分页）
router.post("/teacher/list", async (req, res) => {
    let page = req.body.page || 1;
    let size = req.body.size || 20;
    let searchMap = req.body.searchMap || {};
    let obj = {};
    searchMap.jobnumber ? obj["jobnumber"] = searchMap.jobnumber : obj;
    searchMap.name ? obj["name"] = searchMap.name : obj;
    searchMap.role !== "" ? obj["role"] = searchMap.role : obj;
    searchMap.entrydate ? obj["entrydate"] = searchMap.entrydate : obj;
    searchMap.phone ? obj["phone"] = searchMap.phone : obj;
    //console.log(req.body);
    teacherDB.find(obj, (err, doc) => {
        if (err) {
            return res.send({
                code: 3000,
                flag: false,
                msg: "服务器错误"
            })
        }
        let count = doc.length;
        teacherDB.find(obj, null, { limit: parseInt(size), skip: (page - 1) * parseInt(size) })
            .then(teacher => {
                //console.log(teacher);
                res.send({
                    code: 2000,
                    flag: true,
                    msg: "查询成功",
                    data: {
                        total: count,
                        rows: teacher
                    }
                })
            })
            .catch(e => {
                return res.send({
                    code: 3000,
                    flag: false,
                    msg: "服务器错误"
                })
            })
    })
})
//新增教师
router.post("/teacher/", async (req, res) => {
    const { jobnumber, role, name, entrydate, phone } = req.body;
    console.log(req.body);
    let doc = await teacherDB.findOne({ jobnumber })
    console.log(doc);
    //数据库中不存在 那么创建该用户
    if (!doc) {
        teacherDB.create({ jobnumber, role, name, entrydate, phone })
            .then(() => {
                res.send({
                    code: 0,
                    flag: true,
                    msg: "新增成功"
                })
            })
            .catch((e) => {
                //console.log(e);
                res.send({
                    code: 4,
                    flag: false,
                    msg: "服务器出错"
                })
            })
    } else {
        res.send({
            code: 2,
            flag: false,
            msg: "新增失败，工号已存在哦"
        })
    }

})
//根据id查询教师
router.get("/teacher", (req, res) => {
    const { id } = req.query;
    //console.log(req.query);
    teacherDB.findById(id)
        .then(doc => {
            //console.log(doc);
            return res.status(200).json({
                code: 2000,
                flag: true,
                msg: "根据id查询教师成功",
                data: doc
            })
        })
        .catch(e => {
            return res.status(200).json({
                code: 3000,
                flag: false,
                msg: "根据id查询教师失败"
            })
        })
})
//根据id修改教师
router.put("/teacher", (req, res) => {
    //const id = req.body._id;
    //console.log("req.body",req.body);
    //console.log("req.query",req.query);
    //console.log("req.body",req.body);
    const id = { _id: req.body._id };
    //console.log(req.body);
    teacherDB.updateOne(id, req.body)
        .then((doc) => {
            console.log(doc);
            return res.status(200).json({
                code: 2000,
                flag: true,
                msg: "根据id修改教师成功"
            })
        })
        .catch(e => {
            console.log(e);
            return res.status(200).json({
                code: 3000,
                flag: false,
                msg: "根据id修改教师失败"
            })
        })
})
//根据id进行删除
router.delete("/teacher", (req, res) => {
    //const id = {_id:req.body._id};
    //console.log(req.body);
    //console.log(id);
    teacherDB.findByIdAndDelete(req.body.id)
        .then(doc => {
            console.log(doc);
            return res.status(200).json({
                code: 2000,
                flag: true,
                msg: "根据id删除教师成功"
            })
        })
        .catch(e => {
            console.log(e);
            return res.status(200).json({
                code: 3000,
                flag: false,
                msg: "根据id删除教师失败"
            })
        })
})
//获取学生学员列表（分页）
router.post("/students/list", (req, res) => {
    let page = req.body.page;
    let size = req.body.size;
    let searchMap = req.body.searchMap || {};
    let obj = {};
    searchMap.stunum ? obj["stunum"] = searchMap.stunum : obj;
    searchMap.name ? obj["name"] = searchMap.name : obj
    searchMap.admissiondate ? obj["admissiondate"] = searchMap.admissiondate : obj
    searchMap.teacher ? obj["teacher"] = searchMap.teacher : obj
    searchMap.class ? obj["class"] = searchMap.class : obj
    studentDB.find(obj, (err, doc) => {
        if (err) {
            return res.send({
                code: 3000,
                flag: false,
                msg: "查询所有学生失败"
            })
        }
        let count = doc.length
        studentDB.find(obj, null, { limit: parseInt(size), skip: (page - 1) * parseInt(size) })
            .then(students => {
                return res.send({
                    code: 2000,
                    flag: true,
                    msg: "查询成功",
                    data: {
                        total: count,
                        rows: students
                    }
                })
            })
            .catch(e => {
                return res.send({
                    code: 3000,
                    flag: false,
                    msg: "查询学生分页失败"
                })
            })
    })
})
//新增学生
router.post("/students", async (req, res) => {
    const { stunum } = req.body;
    console.log('新增教师', req.body);
    let doc = await studentDB.findOne({ stunum })
    console.log('查询该教师是否存在', doc);
    //数据库中不存在 那么创建该用户
    if (!doc) {
        studentDB.create(req.body)
            .then(() => {
                res.send({
                    code: 0,
                    flag: true,
                    msg: "新增成功"
                })
            })
            .catch((e) => {
                //console.log(e);
                res.send({
                    code: 4,
                    flag: false,
                    msg: "服务器出错"
                })
            })
    } else {
        res.send({
            code: 2,
            flag: false,
            msg: "新增失败，工号已存在哦"
        })
    }

})
//根据id查询学生
router.get("/students", (req, res) => {
    const { id } = req.query;
    //console.log(req.query);
    studentDB.findById(id)
        .then(doc => {
            //console.log(doc);
            return res.status(200).json({
                code: 2000,
                flag: true,
                msg: "根据id查询学员成功",
                data: doc
            })
        })
        .catch(e => {
            return res.status(200).json({
                code: 3000,
                flag: false,
                msg: "根据id查询学员失败"
            })
        })
})
//根据id修改学生
router.put("/students", (req, res) => {
    //const id = req.body._id;
    //console.log("req.body",req.body);
    //console.log("req.query",req.query);
    //console.log("req.body",req.body);
    const id = { _id: req.body._id };
    //console.log(req.body);
    studentDB.updateOne(id, req.body)
        .then((doc) => {
            console.log(doc);
            return res.status(200).json({
                code: 2000,
                flag: true,
                msg: "根据id修改学员成功"
            })
        })
        .catch(e => {
            console.log(e);
            return res.status(200).json({
                code: 3000,
                flag: false,
                msg: "根据id修改学员失败"
            })
        })
})
//根据id进行删除学员
router.delete("/students", (req, res) => {
    //const id = {_id:req.body._id};
    //console.log(req.body);
    //console.log(id);
    studentDB.findByIdAndDelete(req.body.id)
        .then(doc => {
            console.log(doc);
            return res.status(200).json({
                code: 2000,
                flag: true,
                msg: "根据id删除学员成功"
            })
        })
        .catch(e => {
            console.log(e);
            return res.status(200).json({
                code: 3000,
                flag: false,
                msg: "根据id删除学员失败"
            })
        })
})
//校验原密码是否正确
router.post("/user/pwd", (req, res) => {
    let body = req.body;
    let password = body.password
    userDB.findOne({
        _id: body.userId,
    })
        .then(doc => {
            console.log(doc);
            if (doc.password !== password) {
                return res.send({
                    code: 4000,
                    flag: false,
                    msg: '请输入正确的原密码哦'
                })
            } else {
                return res.send({
                    code: 2000,
                    flag: true,
                    msg: "密码校验成功哦"
                })
            }
        })
        .catch(e => {
            console.log("密码校验失败", e);
            res.send({
                code: 3000,
                flag: false,
                msg: "密码校验失败，服务器错误哦"
            })
        })
})
//修改密码
router.put("/user/pwd", (req, res) => {
    let id = req.body.userId
    let password = req.body.password
    userDB.updateOne({ _id: id }, { password: password })
        .then(doc => {
            console.log(doc);
            res.send({
                code: 2000,
                flag: true,
                msg: "密码修改成功哦"
            })
        })
        .catch(e => {
            console.log("密码修改失败", e);
            res.send({
                code: 3000,
                flag: false,
                msg: "密码修改失败，服务器错误哦"
            })
        })
})

/* axios({
    url: "http://pv.sohu.com/cityjson?ie=utf-8",
    method: "get",
    headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36"
    }
}).then(({ data }) => {
    console.log(data);
    // 加工数据
    // ways1
    // let data1 = data.replace(/\w{3}\s\w+\s=\s/i,"").replace(/;$/,"")
     //data1 = JSON.parse(data1)
     //console.log(data1)
    // ways2
     let reg =/\{[\s\S]+\}/g;
     let data2 = data.match(reg)
     data2 = JSON.parse(data2)
    router.get("/getIp", (req, res) => {
        if (data) {
          return  res.send({
                code: 2000,
                data: data2,
                flag: true
            })
        }else{
            return res.send({
                code:3000,
                msg:"获取ip失败",
                flag:false
            })
        }

    })
}).catch(e => {
    console.log(e);
}) */
module.exports = router
