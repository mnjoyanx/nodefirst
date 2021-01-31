const { Router } = require('express')
const router = Router()

const Cart = require('../models/cart')
const Books = require('../models/books')

router.get('/', async(req, res) => {
    // const cart = await Cart.fetch()
    // res.render('cart', {
    //     title: 'Cart',
    //     isCart: true,
    //     price: cart.price,
    //     books: cart.books
    // })
    res.json({test: true})
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