import React from 'react'
import { useSelector } from 'react-redux'

export default function Profle() {
  const { currentUser } = useSelector((state) => state.user)
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <img
          src={currentUser.profilePicture}
          alt=""
          className=" self-center rounded-full h-24 w-24 cursor-pointer"
        />
        <input
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
          className="outline-none  p-3 rounded-lg bg-slate-100"
        />
        <input
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
          className="outline-none  p-3 rounded-lg bg-slate-100"
        />
        <input
          type="password"
          id="password"
          placeholder="password"
          className="outline-none  p-3 rounded-lg bg-slate-100"
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          update
        </button>
      </form>
      <div className="flex justify-between mt-4">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign In</span>
      </div>
    </div>
  )
}
