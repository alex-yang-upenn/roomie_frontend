import Conversation from "@/app/_components/inbox/Conversation"
import apiService from "../_libs/apiService"
import { getUserId } from '@/app/_libs/actions'
import React, { useState, useEffect } from "react"

export type UserType = {
  id: string
  name: string
  avatar_url: string
}

export type ConversationType = {
  id: string
  users: UserType[]
}

const InboxPage = async () => {
  const userId = await getUserId()

  if (!userId) {
    return (
      <main className="max-w-[2000px] mx-auto px-6 pb-6">
        <p>You need to be authenticated...</p>
      </main>
    )
  }

  const conversations = await apiService.get("/api/chat/")

  return (
    <main className="max-w-[2000px] mx-auto px-6 pb-6">
      <h1 className="my-6 text-2xl">Inbox</h1>

      {conversations.map((conversation: ConversationType) => {
        return (
          <Conversation
            key={conversation.id}
            userId={userId}
            conversation={conversation}
          />
        )
      })}
    </main>
  )
}

export default InboxPage
