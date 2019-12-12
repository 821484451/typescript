import * as Koa from 'koa';
import * as serve from 'koa-static';
import { load } from './utils/route-decors';
import { resolve } from 'path';
import { Sequelize } from 'sequelize-typescript';
import * as session from 'koa-session';
const bodyParser = require('koa-bodyparser');
const app = new Koa();
app.use(serve(`${__dirname}/public`));
app.use(bodyParser())


const database = new Sequelize({
  port: 3306,
  database: 'study',
  username: 'root',
  password: 'root',
  dialect: 'mysql',
  models: [`${__dirname}/models`]
});
database.sync({force: true})//自动同步数据库

// // 签名key keys作用 用来对cookie进行签名 
app.keys = ['some secret'];
// 配置项 
const SESS_CONFIG = { 
  key: 'koa:sess', // cookie键名 
  maxAge: 86400000, // 有效期，默认一天 
  httpOnly: true, // 仅服务器修改 
  signed: true, // 签名cookie 
};
//注册 
app.use(session(SESS_CONFIG, app));
app.use((ctx, next) => { 
  if (ctx.url == '/register' || ctx.url == '/' || ctx.url.indexOf('login') > -1) { 
    next() 
  } else { 
    console.log(ctx.session);
    if (!ctx.session.userInfo) { 
      ctx.body = { message: "登录失败" } 
    } else { 
      next() 
    } 
  } 
});
const router = load(resolve(__dirname, './routes'));

app.use(router.routes());




app.listen(3000, () => {
    console.log('启动服务器成功……')
})

