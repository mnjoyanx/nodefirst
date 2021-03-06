const { Router } = require('express')
const Books = require('../models/books')

const router = Router()

router.get('/', (req, res) => {
    res.render('addBook', {
        title: 'Add Book',
        isAddBook: true
    })
})

router.post('/', async(req, res) => {

    const { title, price, imgUrl } = req.body
    const books = new Books({ title, price, imgUrl, userId: req.user._id })

    try {
        await books.save()
        res.redirect('/books')
    } catch (err) {
        console.log(err)
    }


})


module.exports = router