const userModel = require('../lib/mysql.js');
const md5 = require('md5')
const checkNotLogin = require('../middlewares/check.js').checkNotLogin
const checkLogin = require('../middlewares/check.js').checkLogin
const moment = require('moment');
const fs = require('fs')

exports.getSignup = async ctx => {
    await checkNotLogin(ctx)
    await ctx.render('signup', {
        session: ctx.session,
    })
}
exports.postSignup = async ctx => {
    let { name, password, repeatpass} = ctx.request.body
    console.log(typeof password)
    //查找这个人是否在数据库里
    await userModel.findDataCountByName(name)
        .then(async (result) => {
            console.log("这是向数据库请求的结果")
            console.log(result)
            if (result[0].count >= 1) {
                // 用户存在
                ctx.body = {
                    code: 500,
                    message: '用户存在'
                };
            } else if (password !== repeatpass || password.trim() === '') {
                ctx.body = {
                    code: 500,
                    message: '两次输入的密码不一致'
                };
            }  else {
                    await userModel.insertData([name, md5(password)])
                        .then(res => {
                            console.log('注册成功', res)
                            //注册成功
                            ctx.body = {
                                code: 200,
                                message: '注册成功'
                            };
                        })
            }
        })
}