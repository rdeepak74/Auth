import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js'
import jwt from 'jsonwebtoken'
export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body

    // const existingUser = await User.findOne({ email })
    // if (existingUser) {
    //   return res.status(400).json({ msg: 'Email already exists' })
    // }

    const hashpassword = bcryptjs.hashSync(password, 10)

    const newUser = new User({
      username,
      email,
      password: hashpassword,
    })

    await newUser.save()
    res.status(201).json({
      message: 'User created successfully',
    })
  } catch (error) {
    // res.status(500).json({
    //   message: `Error creating user ${error}`,
    // })
    next(error)
    // next(errorHandler(500, 'something error'))
  }
}

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const validuser = await User.findOne({ email })
    if (!validuser) {
      return next(errorHandler(401, 'User not found!'))
    }
    const isPassword = bcryptjs.compareSync(password, validuser.password)
    if (!isPassword) {
      return next(errorHandler(402, 'Invalid credentials'))
    }
    const token = jwt.sign({ id: validuser._id }, process.env.SECRET_KEY)
    const { password: hashedPassword, ...user } = validuser._doc
    // console.log(token)
    res
      .cookie('access_token', token, { httpOnly: true, maxAge: 3600000 })
      .status(200)
      .json(user)
  } catch (error) {
    next(errorHandler(500, 'something error'))
    next(error)
  }
}

export const google = async (req, res, next) => {}
