'use client'

import useLoginModal from "@/app/_libs/useLoginModal"
import useAddPropertyModal from "@/app/_libs/useAddPropertyModal"

type Props = {
  userId?: string | null
}

const AddPropertyButton = ({ userId }: Props) => {
  const loginModal = useLoginModal()
  const addPropertyModal = useAddPropertyModal()
  
  const becomeARoomie = () => {
    if (userId) {
      addPropertyModal.open()
    } else {
      loginModal.open()
    }
  }
  
  return (
    <div
      onClick={becomeARoomie}
      className="cursor-pointer p-2 text-sm font-semibold rounded-full hover:bg-gray-200"
    >
      Become a Roomie
    </div>
  )
}

export default AddPropertyButton