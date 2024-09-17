import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage'
import { app } from '../firebase'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from '../redux/user/userSlice'
export default function Profle() {
  const { currentUser, loading, error } = useSelector((state) => state.user)
  const fileRef = useRef(null)
  const [image, setImage] = useState(undefined)
  const [imageprogress, setImageProgress] = useState(0)
  const [imageError, setImageError] = useState(false)
  const [formData, setFormDate] = useState({})
  const dispatch = useDispatch()
  const [updateSucces, setUpdateSucces] = useState(false)
  useEffect(() => {
    if (image) {
      handleFileUpload(image)
    }
  }, [image])
  const handleFileUpload = async (image) => {
    // console.log(image)
    const storage = getStorage(app)
    const fileName = new Date().getTime() + image.name
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, image)
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including number of bytes and total number of bytes expected
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        // console.log(`Upload is ${progress}% done`)
        setImageProgress(Math.round(progress))
      },
      (error) => {
        setImageError(true)
      },
      () => {
        // Handle successful upload on complete
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setFormDate({ ...formData, profilePicture: downloadUrl })
        })
      }
    )
  }

  const handleChange = (e) => {
    setFormDate((prevData) => ({ ...prevData, [e.target.id]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      dispatch(updateUserStart())
      const res = await axios.post(
        `api/user/update/${currentUser._id}`,
        formData
      )
      console.log(res.data)
      dispatch(updateUserSuccess(res.data))
      setUpdateSucces(true)
    } catch (error) {
      console.log(error)
      dispatch(updateUserFailure(error.response.data))
    }
  }

  // console.log(formData)
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img
          src={formData.profilePicture || currentUser.profilePicture}
          alt=""
          className=" self-center rounded-full h-24 w-24 cursor-pointer"
          onClick={() => {
            fileRef.current.click()
          }}
        />
        <p className="text-sm self-center">
          {imageError ? (
            <span className="text-red-700">Error Uploading image</span>
          ) : imageprogress > 0 && imageprogress < 100 ? (
            <span>{`Uploading: ${imageprogress} %`}</span>
          ) : imageprogress === 100 ? (
            <span className="text-green-700">Image uploaded Successfully</span>
          ) : (
            ''
          )}
        </p>
        <input
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
          className="outline-none  p-3 rounded-lg bg-slate-100"
          onChange={handleChange}
        />
        <input
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
          className="outline-none  p-3 rounded-lg bg-slate-100"
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="password"
          className="outline-none  p-3 rounded-lg bg-slate-100"
          onChange={handleChange}
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          {loading ? 'Loading...' : 'Update'}
        </button>
      </form>
      <div className="flex justify-between mt-4">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
      <p className="text-red-700 mt-5">
        {error && <span>Something went wrong!!</span>}
      </p>
      <p className="text-green-700 mt-4">
        {updateSucces && <span>User is updated succuesfully!!</span>}
      </p>
    </div>
  )
}
