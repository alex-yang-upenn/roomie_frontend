'use client'

import Modal from "./Modal"
import CustomButton from "../forms/CustomButton"
import useSignupModal from "@/app/_libs/useSignupModal"
import apiService from "@/app/_libs/apiService"
import { handleLogin } from "@/app/_libs/actions"
import { useRouter } from "next/navigation"
import React, { useState } from "react"

const SignupModal = () => {
  const router = useRouter()
  const signupModal = useSignupModal()
  const [errors, setErrors] = useState<string[]>([])
  const [email, setEmail] = useState("")
  const [password1, setPassword1] = useState("")
  const [password2, setPassword2] = useState("")

  const submitSignup = async () => {
    const formData = {
      email: email,
      password1: password1,
      password2: password2
    }
    const response = await apiService.postWithoutToken("/api/auth/register/", JSON.stringify(formData))

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


  return (
    <Modal label="Sign-up" isOpen={signupModal.isOpen} onClose={signupModal.close}>
      <form action={submitSignup} className="space-y-4">
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

        {errors.map((error, index) => {
          return (
            <div key={`error_${index}`} className="p-5 bg-airbnb text-white rounded-xl opacity-80">
              {error}
            </div>
          )
        })}
        
        <CustomButton label="Sign-up" onClick={submitSignup} />
      </form>
    </Modal>
  )
}

export default SignupModal