'use client'

import { useRouter } from "next/navigation"
import { resetAuthCookies } from "../_libs/actions"
import MenuLink from "./navbar/MenuLink"

import React from 'react'

type Props = {
  onClick: () => void
}

const LogoutButton = ({ onClick }: Props) => {
  const router = useRouter()
  
  const submitLogout = async () => {
    await resetAuthCookies()
    onClick()
    router.push("/")
  }

  return (
    <MenuLink label="Log-out" onClick={submitLogout} />
  )
}

export default LogoutButton