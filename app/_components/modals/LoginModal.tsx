'use client'

import Modal from "./Modal"
import CustomButton from "../forms/CustomButton"
import useLoginModal from "@/app/_libs/useLoginModal"
import apiService from "@/app/_libs/apiService"
import { handleLogin } from "@/app/_libs/actions"
import { useRouter } from "next/navigation"
import React, { useState } from "react"

const LoginModal = () => {
  const router = useRouter()
  const loginModal = useLoginModal()
  const [errors, setErrors] = useState<string[]>([])
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const submitLogin = async () => {
    const formData = {
      email: email,
      password: password
    }
    const response = await apiService.postWithoutToken("/api/auth/login/", JSON.stringify(formData))

    if (response.access) {
      handleLogin(response.user.pk, response.access, response.refresh)
      
      loginModal.close()
    } else {
      const tmpErrors: string[] = Object.values(response).map((error: any) => {
        return error
      })
      setErrors(tmpErrors)
    }
  }

  return (
    <Modal label="Log-in" isOpen={loginModal.isOpen} onClose={loginModal.close}>
      <form className="space-y-4" action={submitLogin}>
        <input
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Your email address" 
          type="email" 
          className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
        />
        
        <input 
          onChange = {(e) => setPassword(e.target.value)}
          placeholder="Your password"
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
        
        <CustomButton label="Submit" onClick={submitLogin} />
      </form>
    </Modal>
  )
}

export default LoginModal