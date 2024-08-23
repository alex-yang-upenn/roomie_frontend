import { create } from "zustand"

export type BookingInfo = {
  success: boolean
  totalPrice: number
  startDate: Date
  endDate: Date
  propertyName: string
  guests: number
  bathrooms: number
  bedrooms: number
}

type BookingNotificationModalStore = {
  isOpen: boolean
  open: () => void
  close: () => void
  info: BookingInfo
  setInfo: (info: BookingInfo) => void
}

const useBookingNotificationModal = create<BookingNotificationModalStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  setInfo: (info: BookingInfo) => set({ info: info }),
  info: {
    success: false,
    totalPrice: 0,
    startDate: new Date(),
    endDate: new Date(),
    propertyName: "",
    guests: 0,
    bathrooms: 0,
    bedrooms: 0
  }
}))

export default useBookingNotificationModal