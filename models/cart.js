const fs = require('fs')
const path = require('path')

class Cart {

    static async add(book) {
        const cart = await Cart.fetch()

        const idx = cart.books.findIndex(item => item.id === book.id)
        const candidate = cart.books[idx]

        if (candidate) {
            candidate.count++
                cart.books[idx] = candidate
        } else {
            book.count = 1
            cart.books.push(book)
        }

        cart.price += +book.price

        return new Promise((res, rej) => {
            fs.writeFile(path.join(__dirname, '../data/cart.json'),
                JSON.stringify(cart),
                err => {
                    if (err) rej(err)
                    else res()
                }
            )
        })
    }

    static async remove(id) {
        const cart = await Cart.fetch()

        const idx = cart.books.findIndex(i => i.id === id)
        const book = cart.books[idx]

        if (book.count === 1) {
            cart.books = cart.books.filter(item => item.id !== id)
        } else {
            cart.books[idx].count--
        }


        cart.price -= book.price

        return new Promise((res, rej) => {
            fs.writeFile(path.join(__dirname, '../data/cart.json'),
                JSON.stringify(cart),
                err => {
                    if (err) rej(err)
                    else res(cart)
                }
            )
        })

    }

    static async fetch() {
        return new Promise((res, rej) => {
            fs.readFile(path.join(__dirname, '../data/cart.json'),
                'utf-8',
                (err, content) => {
                    if (err) rej(err)
                    else res(JSON.parse(content))
                }
            )
        })
    }


}


module.exports = Cart