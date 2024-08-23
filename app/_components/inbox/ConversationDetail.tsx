'use client'

import CustomButton from "@/app/_components/forms/CustomButton"
import { UserType, ConversationType } from "@/app/inbox/page"
import { MessageType } from "@/app/inbox/[id]/page"
import useWebSocket from "react-use-websocket"
import clsx from "clsx"
import { useEffect, useState, useRef } from "react"

type Props = {
  userId: string
  token: string
  conversation: ConversationType
  messages: MessageType[]
}

const ConversationDetail = ({ userId, token, conversation, messages }: Props) => {
  const myUser = conversation.users?.find((user) => user.id == userId)
  const otherUser = conversation.users?.find((user) => user.id != userId)
  
  const [newMessage, setNewMessage] = useState("")
  const [realtimeMessages, setRealtimeMessages] = useState<MessageType[]>([])
  const messagesDiv = useRef<HTMLDivElement>(null)

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(`${process.env.NEXT_PUBLIC_WS_HOST}/ws/${conversation.id}/?token=${token}`, {
      share: false,
      shouldReconnect: () => true
    }
  )

  useEffect(() => {
    console.log("Connection state changed", readyState)
  }, [readyState])

  useEffect(() => {
    if (lastJsonMessage && typeof lastJsonMessage === "object" && "name" in lastJsonMessage && "body" in lastJsonMessage) {
      const message: MessageType = {
        id: "",
        name: lastJsonMessage.name as string,
        body: lastJsonMessage.body as string,
        conversationId: conversation.id,
        sent_to: otherUser as UserType,
        created_by: myUser as UserType,
      }

      setRealtimeMessages((realtimeMessages) => [...realtimeMessages, message])
    }
  }, [lastJsonMessage])

  const sendMessage = async () => {
    console.log("Send message")
    sendJsonMessage({
      event: 'chat_message',
      data: {
        body: newMessage,
        name: myUser?.name,
        sent_to_id: otherUser?.id,
        conversation_id: conversation.id
      }
    })

    setNewMessage("")

    setTimeout(() => {
      scrollToBottom()
    }, 50)
  }

  const scrollToBottom = () => {
    if (messagesDiv.current) {
      messagesDiv.current.scrollTop = messagesDiv.current.scrollHeight
    }
  }

  return (
    <>
      <div
        ref={messagesDiv}
        className="max-h-[400px] overflow-auto flex flex-col space-y-4"
      >
        {messages.map((message, index) => (
          <div 
            key={index}
            className={clsx("w-[80%] py-4 px-6 rounded-xl", 
                            {"ml-[20%] bg-blue-200" : message.created_by.name == myUser?.name, "bg-gray-200": message.name != myUser?.name})}
          >
            <p className="font-bold text-gray-500">{message.created_by.name}</p>
            <p>{message.body}</p>
          </div>
        ))}

        {realtimeMessages.map((message, index) => (
          <div 
            key={index}
            className={clsx("w-[80%] py-4 px-6 rounded-xl", 
                            {"ml-[20%] bg-blue-200" : message.created_by.name == myUser?.name, "bg-gray-200": message.name != myUser?.name})}
          >
            <p className="font-bold text-gray-500">{message.created_by.name}</p>
            <p>{message.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 py-4 px-6 flex border border-gray-300 space-x-4 rounded-xl">
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="w-full p-2 bg-gray-200 rounded-xl" 
        />
        
        <CustomButton 
          label="Send" 
          onClick={sendMessage}
          className="w-[100px]"
        />
      </div>
    </>
  )
}

export default ConversationDetail