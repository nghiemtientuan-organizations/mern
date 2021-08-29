const express = require('express')
const app = express()
const PORT = 5000

const authRouter = require('./routers/auth')

const MONGO_DB_CONNECT = 'mongodb+srv://nghiemtuan:Aa%40123456@merncluster.adivj.mongodb.net/mern?retryWrites=true&w=majority'
const mongoose = require('mongoose')
const connectDB = async() => {
    try {
        await mongoose.connect(MONGO_DB_CONNECT)

        console.log('MongoDb connected')
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
connectDB()

app.get('/', (req, res) => res.send('Hello'))
app.use('/api/auth', authRouter)

app.listen(PORT, () => console.log(`Server start ${PORT}`))