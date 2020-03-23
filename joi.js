const Joi = require('joi');
const schema = {
    username: Joi.string().min(2).max(5)
};


async function run (){
    try{
        await Joi.validate({username:'a'},schema);
    }catch(ex){
        console.log(ex.message)
        return;
    }
    console.log('yanzhengtyongg')
}
run();