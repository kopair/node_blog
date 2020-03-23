const mongoose = require('mongoose');

const commentSChema = new mongoose.Schema({
    aid:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    },
    uid: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    time: {
        type: Date,
        
    },
    content: {
        type:String
    }
});
const Comment = mongoose.model('Comment',commentSChema);

module.exports = {
    Comment
}