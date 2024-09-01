import React from 'react'
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth'
import { app } from '../firebase'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { sigInSuccess } from '../redux/user/userSlice'
export default function OAuth() {
  const dispatch = useDispatch()
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const auth = getAuth(app)
      const result = await signInWithPopup(auth, provider)
      console.log(result)
      const res = await axios.post('api/auth/google', {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      })
      console.log(res)
      const data = await res.data
      dispatch(sigInSuccess(data))
    } catch (error) {
      console.log('Could not login with google', error)
    }
  }
  return (
    <button
      type="button"
      className="bg-red-700 text-white rounded-lg uppercase p-3 hover:opacity-95"
      onClick={handleGoogleClick}
    >
      Continue with google
    </button>
  )
}
