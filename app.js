require('dotenv').config()
const mongoose = require('mongoose')

const express = require('express')
const app = express()

const notFoundMiddleware = require('./middleware/not-found.js')
const errorMiddleware = require('./middleware/error-handler.js')

const connectDB = require('./db/connect.js')
const productsRouter = require('./routes/products.js')

app.use(express.json())

app.get('/' , (req , res) =>{
    res.send('<h1>Store Api</h1><a href="/api/v1/products"> products route</a>')
})

app.use('/api/v1/products' , productsRouter)

app.use(notFoundMiddleware)
app.use(errorMiddleware)

const port = process.env.PORT || 5000

const start = async() =>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port , console.log(`app listening at port ${port}`))
    } catch (error) {
        console.log(error)
    }
}

start()