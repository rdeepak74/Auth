import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import OAuth from '../components/OAuth'
export default function SignUp() {
  const [formData, setFormData] = useState({})
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
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
      setLoading(true)
      const response = await axios.post('api/auth/signup', formData)
      const data = response.data
      console.log(data)
      setLoading(false)
      setError(false)
      navigate('/login')
    } catch (error) {
      setError(true)
      setLoading(false)
      // console.error(error)
    }
  }
  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-5">Sign Up</h1>
      <form className="flex flex-col gap-4 mx-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          id="username"
          required
          className="bg-slate-100 outline-none rounded-lg p-3"
          onChange={handleChange}
        />
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
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5 mx-4">
        <p>Have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-500">Sign in</span>
        </Link>
      </div>
      <p className="text-red-700 mt-5 mx-4">{error && 'Somthing went wrong'}</p>
    </div>
  )
}
