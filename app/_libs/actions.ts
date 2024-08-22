'use server'

import { cookies } from "next/headers"
import { redirect } from 'next/navigation'

export async function handleRefresh() {
  const refreshToken = await getRefreshToken()
  const token = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/auth/token/refresh/`, {
    method: "POST",
    body: JSON.stringify({
      refresh: refreshToken
    }),
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  })  .then(response => response.json())
      .then((json) => {
        console.log("Refresh", json)

        if (json.access) {
          cookies().set("session_access_token", json.access, {
            httpOnly: true,
            secure: false,
            maxAge: 60 * 60,  // One hour access token validity
            path: "/"
          })
          return json.access
        } else {
          resetAuthCookies()
        }
      })
      .catch((error) => {
        console.log("error", error)
        resetAuthCookies()
      })

  return token
}

export async function handleLogin(userId: string, accessToken: string, refreshToken: string) {
  cookies().set("session_userid", userId, {
    httpOnly: true,
    secure: false,
    maxAge: 60 * 60 * 24 * 7,  // One week userid validity
    path: "/"
  })

  cookies().set("session_access_token", accessToken, {
    httpOnly: true,
    secure: false,
    maxAge: 60 * 60,  // One hour access token validity
    path: "/"
  })

  cookies().set("session_refresh_token", refreshToken, {
    httpOnly: true,
    secure: false,
    maxAge: 60 * 60 * 24 * 7,  // One week refresh token validity
    path: "/"
  })

  redirect("/")  
}

export async function resetAuthCookies() {
  cookies().set("session_userid", "")
  cookies().set("session_access_token", "")
  cookies().set("session_refresh_token", "")
}

export async function getUserId() {
  const userId = cookies().get("session_userid")?.value
  return userId ? userId : null
}

export async function getAccessToken() {
  let accessToken = cookies().get("session_access_token")?.value
  
  if (!accessToken) {
    accessToken = await handleRefresh()
  }

  return accessToken
}

export async function getRefreshToken() {
  const refreshToken = cookies().get("session_refresh_token")?.value
  return refreshToken
}
