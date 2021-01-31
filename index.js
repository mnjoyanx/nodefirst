const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const exphbs = require('express-handlebars')
const app = express()

const User = require('./models/user')

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
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }))

// Rendering pages
app.use('/', home)
app.use('/books', books)
app.use('/addbook', addBook)
app.use('/cart', cart)



// Create server


async function start() {
    try {
        const url = `mongodb+srv://mnjoyan:6vyyaEwUKcs5Lijx@cluster0.fzswx.mongodb.net/test?retryWrites=true&w=majority`
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        await mongoose.set('useFindAndModify', false);

        const candidate = await User.findOne()

        if(!candidate) {
            const user = new User({
                email: 'tigranmnjoyan@gmail.com',
                name: 'Tigran',
                cart: {items: []}
            })
            user.save()
        }

        app.listen(3500, () => {
            console.log(`server is running on port 3500`);
        })
    } catch (err) {
        console.log(err, 'errrr');
    }

}

start()