import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div className="bg-slate-200 ">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <h1 className="font-bold">Auth App</h1>
        <ul className="flex space-x-4">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/sign-in">Sign In</Link>
        </ul>
      </div>
    </div>
  )
}

export default Header
