const { User } = require('../../model/user');
const bcrypt = require('bcrypt');

module.exports = async (req,res) => {
    const {email,password} = req.body;
    if(email.trim().length == 0 || password.trim().length == 0){
        return res.status(400).render('admin/error',{msg:'邮件地址或密码错误'});
    }
    let user = await User.findOne({email});
    if(user){
        let isValue = await bcrypt.compare(password,user.password);
        if(isValue) {
            req.session.username = user.username;
            req.session.role = user.role;
            // 重定向到用户列表
            // res.redirect('/admin/user');
            req.app.locals.userInfo = user;
            if(user.role == 'admin'){
                res.redirect('/admin/user');
            } else {
                res.redirect('/home/')
            }
        } else{
            res.status(400).render('admin/error', {msg:'邮箱或者密码错误'})
        } 
    }
    else{
        res.status(400).render('admin/error',{msg:'邮箱或者密码错误'})
    }
}
 