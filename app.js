const express = require('express');
const path = require('path');
const bodyPaser = require('body-parser');
const session = require('express-session');
const morgan = require('morgan');
const config = require('config');
const app = express();
const template = require('art-template');
const dateformat = require('dateformat');
require('./model/connect');

app.use(bodyPaser.urlencoded({extended:false}))
app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'art');
app.engine('art',require('express-art-template'))
template.defaults.imports.dateformat = dateformat;
app.use(express.static(path.join(__dirname,'public')))
app.use(session({secret:'secret key'}))

console.log(config.get('title'))
if (process.env.NODE_ENV == 'development') {
    console.log('开发环境');
    // app.use(morgan('dev'))
}else{
    console.log('生成环境')

}

const home = require('./route/home');
const admin = require('./route/admin');

// 强制用户登录，拦截未登录的用户
app.use('/admin',require('./middleware/loginGuard'))
app.use('/home',home);
app.use('/admin',admin);
app.use((err,req,res,next) => {
    const result = JSON.parse(err);
    let params = [];
    for (let attr in result){
        if(attr != 'path'){
            params.push(attr + '=' + result[attr]);
        }
    }
    res.redirect(`${result.path}?${params.join('&')}`);
})

app.listen(8080);
console.log('服务器启动成功')