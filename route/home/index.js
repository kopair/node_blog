const { Article } = require('../../model/article');
const pagination = require('mongoose-sex-page');
module.exports = async (req, res) => {
    const page = req.query.page
    let result = await pagination(Article).page(page).size(4).display(5).find().populate('author').exec();
    // res.send(result)
    // return ;
    res.render('home/default',{
        result:result
    })
}