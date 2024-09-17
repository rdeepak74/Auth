import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
import cookieParser from 'cookie-parser'
const app = express()

dotenv.config()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(cookieParser())

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

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Internal Server Error'
  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  })
})
