import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage'
import { app } from '../firebase'
export default function Profle() {
  const { currentUser } = useSelector((state) => state.user)
  const fileRef = useRef(null)
  const [image, setImage] = useState(undefined)
  const [imageprogress, setImageProgress] = useState(0)
  const [imageError, setImageError] = useState(false)
  const [formData, setFormDate] = useState({})
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

  // console.log(formData)
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img
          src={currentUser.profilePicture}
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
