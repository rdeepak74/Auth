import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
const app = express()

dotenv.config()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

const PORT = process.env.PORT || 4002
const URI = process.env.MongoDBURI

try {
  mongoose.connect(URI)
  console.log('Database connected')
} catch (error) {
  console.log('Error connecting Database')
}

app.listen(PORT, () => {
  console.log('Server listening on port', PORT)
})

// app.get('/', (req, res) => {
//   res.json({
//     message: 'Welcome to the API',
//   })
// })

app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)
