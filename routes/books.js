const { Router } = require('express')
const Books = require('../models/books')

const router = Router()

router.get('/', async(req, res) => {
    const books = await Books.getAll()
    res.render('books', {
        title: 'Books',
        isBooks: true,
        books
    })
})

router.get('/:id/edit', async(req, res) => {
    const book = await Books.currentBook(req.params.id)
    if (!req.query.allow) {
        return res.redirect('/')
    }

    res.render('edit', {
        title: `Edit ${book.title}`,
        book
    })
})

router.post('/edit', async(req, res) => {
    await Books.update(req.body)
    res.redirect('/books')
})

router.get('/:id', async(req, res) => {
    const book = await Books.currentBook(req.params.id)
    res.render('book', {
        title: book.title,
        layout: 'empty',
        book
    })
})




module.exports = router