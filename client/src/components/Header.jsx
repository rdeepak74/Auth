import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
function Header() {
  const { currentUser } = useSelector((state) => state.user)

  return (
    <div className="bg-slate-200 ">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <h1 className="font-bold">Auth App</h1>
        <ul className="flex space-x-4">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                src={currentUser.profilePicture}
                alt="profile"
                className="h-7 rounded-full object-cover"
              />
            ) : (
              'Sign In'
            )}
          </Link>
        </ul>
      </div>
    </div>
  )
}

export default Header
