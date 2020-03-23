const mongoose = require('mongoose');
const config = require('config');
const { user, pwd, host, port, name } = config.get('db');

mongoose.connect(`mongodb://${user}:${pwd}@${host}/${name}`,{ useNewUrlParser: true ,useUnifiedTopology: true})
        .then(()=>console.log('数据库连接成功'))
        .catch(()=>console.log('数据连接失败'))