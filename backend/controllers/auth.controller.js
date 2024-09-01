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

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY)
      const { password: hashedPassword, ...rest } = user._doc
      res
        .cookie('access_token', token, { httpOnly: true, maxAgeq: 3600000 })
        .status(200)
        .json(rest)
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8)
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10)

      const newUser = await User.create({
        username:
          req.body.name.split(' ').join('').toLowerCase() +
          Math.random().toString(36).slice(-8),
        email: req.body.email,
        password: hashedPassword,
        profilePicture: req.body.photo,
      })
      // await newUser.save()
      const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY)
      const { password: hashedPassword2, ...rest } = newUser._doc

      res
        .cookie('access_token', token, { httpOnly: true, maxAge: 3600000 })
        .status(200)
        .json(rest)
    }
  } catch (error) {
    next(error)
  }
}
