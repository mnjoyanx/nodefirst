const {Schema, model} = require('mongoose')

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    cart: {
        items: [
            {
                count: {
                    type: Number,
                    default: 1
                },
                bookId: {
                    type: Schema.Types.ObjectId,
                    required: true,
                    ref: 'Book'
                }
            }
        ]
    }
})


userSchema.methods.addToCart = function(book) {
    const items = [...this.cart.items]
    const idx = items.findIndex(item => {
        return item.bookId.toString() === book._id.toString()
    })

    if(idx >= 0) {
        items[idx].count = items[idx].count + 1
    } else {
        items.push({
            count: 1,
            bookId: book._id
        })
    }

    this.cart = {items}
    return this.save()

}


module.exports = model('User', userSchema)