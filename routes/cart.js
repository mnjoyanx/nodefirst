const { Router } = require('express')
const User = require('../models/user')
const router = Router()

const Cart = require('../models/cart')
const Books = require('../models/books')


const mapCartItems = cart => {
    return cart.items.map(item => ({
        ...item.bookId._doc, count: item.count
    }))
}
router.get('/', async(req, res) => {
    

    const user = await req.user
    .populate('cart.items.bookId')
    .execPopulate()

    const book = mapCartItems(user.cart)

    console.log(book, 'this is book')

    res.render('cart', {
        title: book.title,
        isCart: true,
        price: book.price,
        book
    })
})

router.delete('/remove/:id', async(req, res) => {
    const cart = await Cart.remove(req.params.id)
    res.status(200).json(cart)
})

router.post('/add', async(req, res) => {

    const book = await Books.findById(req.body.id)
    await req.user.addToCart(book)
    res.redirect('/books')

})

module.exports = router