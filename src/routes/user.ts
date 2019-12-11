import * as Koa from 'koa';
import {get , post, middlewares, querystring } from '../utils/route-decors';
import model from '../models/user';


@middlewares([
    async function guard(ctx: Koa.Context, next: () => Promise<any>) {
        console.log('guard', ctx.header);

        if (ctx.header.token) {
            await next();
        }else {
            throw "请登录";
        }
    }
])

export default class User {
    @post('/user', {
        middleware: [
            async function validateUser(ctx: Koa.Context, next: () => Promise<any>) {
                // 鉴权
                next()
            }
        ]
    })
    // @querystring({
    //     age: { type: 'int', required: true, max: 200, convertType: 'int' },
    // })
    public async list(ctx: Koa.Context) {
        ctx.body = await model.findAll();
    }
    @post('/login',{
        middleware: [
            async function validation(ctx: Koa.Context, next: () => Promise<any>){
                // 用户名必填
                const name = ctx.request.body.userName;
                const password = ctx.request.body.password;
                if (!name) {
                    ctx.body = {status: 403, msg: "请输入用户名"};
                    return ;
                };
                if (!password) {
                    ctx.body = {status: 403, msg: "密码不能为空"};
                    return ;
                }
                // 用户名不能重复
                try {
                    
                    // 校验通过
                    await next();
                } catch (error) {
                    throw error;
                }
            }
        ]
    })
    public async login(ctx: Koa.Context) {
        const name = ctx.request.body.userName;
        const password = ctx.request.body.password;
        const res = await model.findOne({where: {userName: name}});
        console.log(res);
            ctx.body = res.User;
        
     
        // const data = res.dataValues;
        
        // if(data.length > 0) {
        //     ctx.session.userinfo = name;
        //     ctx.body = {status: 200, data: data, msg: "登陆成功！"}; 
        // }else{
        //     ctx.body = {status: 500, data: data, msg: "登陆失败！"}; 
        // }
         
    }
    @post('/register',{
        middleware: [
            async function validation(ctx: Koa.Context, next: () => Promise<any>){
                // 用户名必填
                const name = ctx.request.body.userName;
                const password = ctx.request.body.password;
                const usercode = ctx.request.body.usercode;
                const status = ctx.request.body.status;
                if (!name) {
                    ctx.body = {status: 403, msg: "请输入用户名"};
                    return ;
                };
                if (!password) {
                    ctx.body = {status: 403, msg: "密码不能为空"};
                    return ;
                };
                if (!usercode) {
                    ctx.body = {status: 403, msg: "usercode不能为空"};
                    return ;
                }
                // 用户名不能重复
                try {
                    
                    // 校验通过
                    await next();
                } catch (error) {
                    throw error;
                }
            }
        ]
    })
    public async register(ctx: Koa.Context) {
        const name = ctx.request.body.userName;
        const password = ctx.request.body.password;
        const usercode = ctx.request.body.usercode;
        const status = ctx.request.body.status;
        const res = await model.create({userName: name, password: password,
        usercode: usercode, status: status});
        ctx.body = {status: 200, data: res, msg: "注册成功！"};  
    }
}