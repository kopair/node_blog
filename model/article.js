const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title:{
        type:String,
        minlength:4,
        maxlength:20,
        required:[true, '请填写文章标题']
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    publishDate: {
        type: Date,
        default: Date.now
    },
    cover: {
        type:String,
        default: null
    },
    content: {
        type: String
    }
});

const Article = mongoose.model('Article',articleSchema);

module.exports = {
    Article
}