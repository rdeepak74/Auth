import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { sigInStart, sigInSuccess, sigInFailure } from '../redux/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import OAuth from '../components/OAuth'
export default function SignIn() {
  const [formData, setFormData] = useState({})
  const { loading, error } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleChange = (e) => {
    setFormData((prevData) => ({ ...prevData, [e.target.id]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // const response = await fetch(
      //   'http://localhost:4001/api/auth/signup',
      //   formData
      // )
      dispatch(sigInStart())
      const response = await axios.post('api/auth/signin', formData)
      const data = response.data
      // console.log(data)
      dispatch(sigInSuccess(data))
      // dispatch(sigInFailure())
      navigate('/')
    } catch (error) {
      console.log(error.response.data)
      dispatch(sigInFailure(error.response.data))
      // console.error(error)
    }
  }
  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-5">Sign In</h1>
      <form className="flex flex-col gap-4 mx-4" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          id="email"
          required
          className="bg-slate-100 outline-none rounded-lg p-3"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          required
          className="bg-slate-100 outline-none rounded-lg p-3"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700  text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? 'Loading...' : 'Sign In'}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5 mx-4">
        <p>Don't have an account?</p>
        <Link to="/sign-up">
          <span className="text-blue-500">Sign up</span>
        </Link>
      </div>
      <p className="text-red-700 mt-5 mx-4">
        {error ? error.message || 'Somthing went wrong' : ''}
      </p>
    </div>
  )
}
