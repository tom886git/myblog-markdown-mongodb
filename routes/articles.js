const { json } = require('express')
const express = require('express')
const Article = require('./../models/article')
const router = express.Router()

router.get('/new', (req, res) => {
    res.render('articles/new', {article: new Article()})
})

router.get('/:slug', async(req, res) => {
    let article = await Article.findOne({slug :req.params.slug})
    if (article == null) res.redirect('/')
    console.log(article)
    res.render('articles/show', { article: article })
    // res.send(req.params.id)
})

router.post('/', async(req, res) => {
    req.article = new Article()

    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    })
    try{
        article = await article.save()
        res.redirect(`/articles/${article.slug}`)
    }catch(e){
        console.log(e)
        res.render('articles/new', { article: article })
    }
})

router.get('/delete/:id', async(req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})
router.delete('/:id', async(req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

// function saveArticleAndRedirect(path) {
//     return async (req, res) => {
//       let article = req.article
//       article.title = req.body.title
//       article.description = req.body.description
//       article.markdown = req.body.markdown
//       try {
//         article = await article.save()
//         res.redirect(`/articles/${article.slug}`)
//       } catch (e) {
//         res.render(`articles/${path}`, { article: article })
//       }
//     }
//   }

module.exports = router

