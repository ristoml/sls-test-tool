const mongoose = require('mongoose')
const test = "test"

//const url = process.env.MONGODB_URI
const url = 'mongodb+srv://eslan:eslan@cluster0.wzwlt.mongodb.net/kneeangleDB?retryWrites=true&w=majority'

console.log('connecting to', url)
mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

//schema & definition of result
const resultSchema = new mongoose.Schema({
    client: {
        type: String
    },
    date: {
        type: Date
    },
    data: {
        type: mongoose.Schema.Types.Mixed
    },
})

//definition of JSON return object
resultSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Result', resultSchema)