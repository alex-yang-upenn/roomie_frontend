'use client'

import clsx from 'clsx'
import React, { useState, useEffect, useCallback }  from 'react'

type Props = {
  label: string
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

const Modal = ({ label, isOpen, onClose, children }: Props) => {
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
    <div className="flex items-center justify-center fixed inset-0 z-50 bg-black/60">
      <div className="relative w-[90%] md:w-[80%] lg:w-[700px] my-6 mx-auto h-auto">
        <div className={clsx(
          "translate duration-300 h-full", 
          {"translate-y-0 opacity-100": showModal, "translate-y-[250%] opacity-10": !showModal}
        )}>
          <div className="w-full h-auto rounded-xl relative flex flex-col bg-white">
            <header className="h-[60px] flex items-center p-6 rounded-xl justify-center relative border-b">
              <div 
                className="p-3 absolute left-3 hover:bg-gray-300 rounded-full cursor-pointer"
                onClick={handleClose}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </div>

              <h2 className="text-lg font-bold"><strong>{label}</strong></h2>
            </header>

            <section className="p-6">
              {children}
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal