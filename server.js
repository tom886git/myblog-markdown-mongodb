const { urlencoded } = require('express')
const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const app = express()

mongoose.connect('mongodb://localhost/blog', {useNewUrlParser: true})

// mongoose.connect('mongodb://localhost/blog', function(){
//     /* Drop the DB */
//     mongoose.connection.db.dropDatabase();
// })


app.set('view engine', 'ejs')
app.use(express.urlencoded({ etended: false}))
app.use(express.json())

app.use('/articles', articleRouter)



app.get('/', async(req, res) => {
    const articles = await Article.find().sort({
        createdAt: 'desc'
    })
    res.render('articles/index', {articles: articles})
})


app.listen(5000)

