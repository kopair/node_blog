const { Article } = require('../../model/article');
const { Comment } = require('../../model/comment')
module.exports = async (req, res) => {
    const id = req.query.id;
    const article = await Article.findOne({_id:id}).populate('author');
    const comments = await Comment.find({aid:id}).populate('uid')
    // res.send(comments)
    res.render('home/article.art',{
        article: article,
        comments:comments
    })
}