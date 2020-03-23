const mongoose = require('mongoose');

// const bcrypt = require('bcrypt');
const Joi = require('joi');

// 用户集合规则
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        minlength:2,
        maxlength:20
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    state:{
        type:Number,
        default:0
    }
})
const User = mongoose.model('User',userSchema);

const validateUser = user =>{
    const schema = {
        username:Joi.string().min(2).max(12).required().error(new Error('用户名不符合用户规则')),
        email: Joi.string().email().error(new Error('邮箱输入不正确')),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).error(new Error('密码不符合规则')),
        role :Joi.string().valid('normal', 'admin').required().error(new Error('角色错误')),
        state: Joi.number().valid(0, 1).required().error(new Error('状态错误'))
    };
    return Joi.validate(user, schema);

}

module.exports = {
    User,
    validateUser
}