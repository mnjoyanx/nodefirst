const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const app = express()

//import routes
const home = require('./routes/home')
const books = require('./routes/books')
const addBook = require('./routes/addbook')
const cart = require('./routes/cart')

// handlebars configuration
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')


// Static files
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }))

// Rendering pages
app.use('/', home)
app.use('/books', books)
app.use('/addbook', addBook)
app.use('/cart', cart)


// Create server

app.listen(3500, () => {
    console.log(`server is running on port 3500`);
})