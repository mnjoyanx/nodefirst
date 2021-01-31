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
                    required: true
                }
            }
        ]
    }
})


module.exports = model('User', userSchema)