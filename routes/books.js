const { Router } = require('express')
const Books = require('../models/books')

const router = Router()

router.get('/', async(req, res) => {
    const books = await Books.find().lean()
    res.render('books', {
        title: 'Books',
        isBooks: true,
        books
    })
})

router.get('/:id/edit', async(req, res) => {
    if (!req.query.allow) {
        return res.redirect('/')
    }
    const book = await Books.findById(req.params.id).lean()

    res.render('edit', {
        title: `Edit ${book.title}`,
        book
    })
})

router.post('/edit', async(req, res) => {
    await Books.findByIdAndUpdate(req.body.id, req.body)
    res.redirect('/books')
})


router.get('/:id', async(req, res) => {
    const book = await Books.findById(req.params.id).lean()
    res.render('book', {
        title: book.title,
        layout: 'empty',
        book
    })
})




module.exports = router