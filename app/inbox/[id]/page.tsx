import ConversationDetail from "@/app/_components/inbox/ConversationDetail"
import { UserType } from "../page"
import { getUserId } from "@/app/_libs/actions"
import { getAccessToken } from "@/app/_libs/actions"
import apiService from "@/app/_libs/apiService"
import React, { useState, useEffect } from "react"

export type MessageType = {
  id: string
  name: string
  body: string
  conversationId: string
  sent_to: UserType
  created_by: UserType
}

const ConversationPage = async ({ params }: { params: { id: string }}) => {
  const userId = await getUserId()
  const token = await getAccessToken()

  if (!userId || !token) {
    return (
      <main className="max-w-[2000px] mx-auto px-6 pb-6">
        <p>You need to be authenticated...</p>
      </main>
    )
  }
  
  const conversation = await apiService.get(`/api/chat/${params.id}/`)

  return (
    <main className="max-w-[2000px] mx-auto px-6 pb-6">
      <ConversationDetail
        userId={userId}
        token={token}
        conversation={conversation.conversation}
        messages={conversation.messages}
      />
    </main>
  )
}

export default ConversationPage