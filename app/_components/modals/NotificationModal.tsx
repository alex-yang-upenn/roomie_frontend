'use client'

import clsx from 'clsx'
import React, { useState, useEffect, useCallback }  from 'react'

type Props = {
  label: string
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

const NotificationModal = ({ label, isOpen, onClose, children }: Props) => {
  const [showModal, setShowModal] = useState(isOpen)
  
  useEffect(() => {
    setShowModal(isOpen)
  }, [isOpen])

  const handleClose = useCallback(() => {
    setShowModal(false)
    setTimeout(() => {
      onClose()
    }, 300)
  }, [onClose])

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4">
      <div className="w-[500px] max-w-[90vw]">
        <div className={clsx(
          "translate duration-300",
          {"translate-y-0 opacity-100": showModal, "translate-y-[250%] opacity-10": !showModal}
        )}>
          <div className="w-full h-auto p-2 rounded-2xl relative flex flex-col bg-white border-4 border-roomieDark">
            <header className="h-[20px] flex items-center p-6 justify-center relative border-b-2 border-gray-300">
              <div 
                className="p-3 absolute left-3 hover:bg-gray-300 rounded-full cursor-pointer"
                onClick={handleClose}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </div>

              <h2 className="text-lg font-bold"><strong>{label}</strong></h2>
            </header>

            <section className="p-4">
              {children}
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotificationModal