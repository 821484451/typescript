import * as Koa from 'koa';
import {get , post} from '../utils/route-decors';
import model from '../models/user';


// @middlewares([
//     async function guard(ctx: Koa.Context, next: () => Promise<any>) {
//         console.log('guard', ctx.header);

//         if (ctx.header.token) {
//             await next();
//         }else {
//             throw "请登录";
//         }
//     }
// ])

export default class User {
    @get('/user', {
        middleware: [
            async function test(ctx: Koa.Context, next: ()=> Promise<any>) {
                next();
            }
        ]
    })
    public async list(ctx: Koa.Context) {
  
        let res = await model.findAll();
        console.log('res', res);
        ctx.body = {status: 200, data: res};
        
        
    };
    @post('/login',{
        middleware: [
            async function validation(ctx: Koa.Context, next: () => Promise<any>){
                // 用户名必填
                let name = ctx.request.body.userName;
                let password = ctx.request.body.password;
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
        let name = ctx.request.body.userName;
        let password = ctx.request.body.password;
        console.log(name);
        console.log(ctx.session);
        ctx.session.userInfo = password;
        ctx.body = {status: 200, msg: "登陆成功"}
        
           
        
        


     
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
                let name = ctx.request.body.userName;
                let password = ctx.request.body.password;
                let usercode = ctx.request.body.usercode;
                let status = ctx.request.body.status;
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