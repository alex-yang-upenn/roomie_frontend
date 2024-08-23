'use client'

import Modal from "./Modal"
import CustomButton from "../forms/CustomButton"
import useSignupModal from "@/app/_libs/useSignupModal"
import apiService from "@/app/_libs/apiService"
import { handleLogin } from "@/app/_libs/actions"
import { useRouter } from "next/navigation"
import Image from "next/image"
import React, { ChangeEvent, useState } from "react"

const SignupModal = () => {
  const router = useRouter()
  const signupModal = useSignupModal()
  const [errors, setErrors] = useState<string[]>([])
  const [email, setEmail] = useState("")
  const [password1, setPassword1] = useState("")
  const [password2, setPassword2] = useState("")
  const [username, setUsername] = useState("")
  const [dataImage, setDataImage] = useState<File | null>(null)

  const setImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const tmpImage = event.target.files[0]
      setDataImage(tmpImage)
    }
  }

  const submitSignup = async () => {
    if (username && email && password1 && password2 && dataImage) {
      const formData = new FormData()
      formData.append("name", username)
      formData.append("email", email)
      formData.append("password1", password1)
      formData.append("password2", password2)
      formData.append("avatar", dataImage)

      const response = await apiService.postWithImage("/api/auth/register/", formData)

      if (response.access) {
        handleLogin(response.user.pk, response.access, response.refresh)
        signupModal.close()
      } else {
        const tmpErrors: string[] = Object.values(response).map((error: any) => {
          return error
        })
        setErrors(tmpErrors)
      }
    }
  }


  return (
    <Modal label="Sign-up" isOpen={signupModal.isOpen} onClose={signupModal.close}>
      <div className="h-[50vh] overflow-y-auto p-2">
        <form action={submitSignup} className="space-y-4">
          <input 
            onChange = {(e) => setUsername(e.target.value)}
            placeholder="Your username"
            type="text"
            className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
          />
          
          <input 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Your email address" 
            type="email" 
            className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
          />

          <input 
            onChange = {(e) => setPassword1(e.target.value)}
            placeholder="Your password"
            type="password"
            className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
          />

          <input 
            onChange = {(e) => setPassword2(e.target.value)}
            placeholder="Repeat password"
            type="password"
            className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
          />

          
          <div className="pt-3 pb-6 space-y-2">
            <p className="px-4">Add profile picture</p>
            <div className="py-4 px-6 bg-gray-600 text-white rounded-xl">
              <input
                type="file"
                accept="image/*"
                onChange={setImage}
              />
            </div>

            {dataImage && (
              <div className="w-[200px] h-[150px] relative">
                <Image
                  fill
                  alt="Uploaded image"
                  src={URL.createObjectURL(dataImage)}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            )}
          </div>

          {errors.map((error, index) => {
            return (
              <div key={`error_${index}`} className="p-5 bg-roomie text-white rounded-xl opacity-80">
                {error}
              </div>
            )
          })}
          
          <CustomButton 
            label="Sign-up" 
            onClick={submitSignup}
          />
        </form>
      </div>
    </Modal>
  )
}

export default SignupModal