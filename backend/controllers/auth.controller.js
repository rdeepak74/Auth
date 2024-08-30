import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ msg: 'Email already exists' })
    }

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
    res.status(500).json({
      message: `Error creating user ${error}`,
    })
  }
}
