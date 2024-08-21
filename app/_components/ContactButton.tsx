'use client'

import useLoginModal from "@/app/_libs/useLoginModal"
import apiService from "@/app/_libs/apiService"
import { useRouter } from "next/navigation"

type Props = {
  userId: string | null
  landlordId: string
}

const ContactButton = ({ userId, landlordId }: Props) => {
  const loginModal = useLoginModal()
  const router = useRouter()
  
  const startConversation = async () => {
    if (userId) {
      const conversation = await apiService.get(`/api/chat/start/${landlordId}/`)

      if (conversation.conversation_id) {
        router.push(`/inbox/${conversation.conversation_id}`)
      }
    } else {
      loginModal.open()
    }
  }

  return (
    <div
      onClick={startConversation}
      className="py-4 px-6 cursor-pointer bg-airbnb hover:bg-airbnbDark text-white rounded-xl transition"
    >
      Contact
    </div>
  )
}

export default ContactButton