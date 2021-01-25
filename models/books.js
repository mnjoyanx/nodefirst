const short = require('short-uuid');
const fs = require('fs')
const path = require('path')

class Books {
    constructor(title, price, imgUrl) {
        this.title = title,
            this.price = price,
            this.imgUrl = imgUrl
        this.id = short.generate()
    }

    toJSON() {
        return {
            title: this.title,
            price: this.price,
            imgUrl: this.imgUrl,
            id: this.id
        }
    }
    async save() {
        const books = await Books.getAll()
        books.push(this.toJSON())
        return new Promise((res, rej) => {
            fs.writeFile(path.join(__dirname, '../data/books.json'),
                JSON.stringify(books),
                err => {
                    if (err) rej(err)
                    else res()
                }
            )
        })
    }


    static async update(book) {
        const allBooks = await Books.getAll()
        const idx = allBooks.findIndex(d => d.id === book.id)

        allBooks[idx] = book

        return new Promise((res, rej) => {
            fs.writeFile(path.join(__dirname, '../data/books.json'),
                JSON.stringify(allBooks),
                err => {
                    if (err) rej(err)
                    else res()
                }
            )
        })
    }

    static getAll() {
        return new Promise((res, rej) => {
            fs.readFile(path.join(__dirname, '../data/books.json'),
                'utf-8',
                (err, content) => {
                    if (err) rej(err)
                    else res(JSON.parse(content))
                }
            )
        })
    }

    static async currentBook(id) {
        const books = await Books.getAll()
        return books.find(item => item.id === id)
    }
}

module.exports = Books