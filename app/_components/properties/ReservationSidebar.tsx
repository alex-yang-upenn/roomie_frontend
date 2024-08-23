'use client'

import Calendar from "../forms/Calendar"
import Loading from "@/app/loading"
import useLoginModal from "@/app/_libs/useLoginModal"
import useBookingNotificationModal from "@/app/_libs/useBookingNotification"
import apiService from "@/app/_libs/apiService"
import { Range } from "react-date-range"
import { differenceInDays, eachDayOfInterval } from "date-fns"
import format from "date-fns/format"
import clsx from "clsx"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(new Date().setDate(new Date().getDate() + 1)),
  key: "selection"
}

export type PropertyReservationType = {
  id: string
  title: string
  guests: number
  bedrooms: number
  bathrooms: number
  price_per_night: number
}

type Props = {
  userId: string | null,
  property: PropertyReservationType
}

const ReservationSidebar = ({ property, userId }: Props) => {
  const loginModal = useLoginModal()
  const bookingNotificationModal = useBookingNotificationModal()
  const router = useRouter()

  const [loading, setLoading] = useState<boolean>(true)
  const [disabled, setDisabled] = useState<boolean>(true)

  const [fee, setFee] = useState<number>(0)
  const [nights, setNights] = useState<number>(1)
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const [dateRange, setDateRange] = useState<Range>(initialDateRange)
  const [bookedDates, setBookedDates] = useState<Date[]>([])
  const [guests, setGuests] = useState<string>("1")
  const guestsRange = Array.from({ length: property.guests }, (_, index) => index + 1)
  
  const _setDateRange = (selection: any) => {
    const newStartDate = new Date(selection.startDate)
    const newEndDate = new Date(selection.endDate)

    if (newEndDate <= newStartDate) {
      newEndDate.setDate(newStartDate.getDate() + 1)
    }

    setDateRange({...dateRange, startDate: newStartDate, endDate: newEndDate})
    setDisabled(false)
  }

  const performBooking = async () => {
    setLoading(true)
    if (userId) {
      if (dateRange.startDate && dateRange.endDate) {
        const formData = new FormData()
        formData.append("guests", guests)
        formData.append("start_date", format(dateRange.startDate, 'yyyy-MM-dd'))
        formData.append("end_date", format(dateRange.endDate, 'yyyy-MM-dd'))
        formData.append("number_of_nights", nights.toString())
        formData.append("total_price", totalPrice.toString())

        const response = await apiService.post(`/api/properties/${property.id}/book/`, formData)

        if (response.success) {
          bookingNotificationModal.setInfo({
            success: true,
            totalPrice: totalPrice,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            propertyName: property.title,
            guests: parseInt(guests),
            bathrooms: property.bathrooms,
            bedrooms: property.bedrooms
          })
          router.push("/myreservations")
        } else {
          bookingNotificationModal.setInfo({
            ...bookingNotificationModal.info,
            success: false,
          })
          router.push("/")
        }
        bookingNotificationModal.open()
      }
    } else {
      loginModal.open()
    }
    setLoading(false)
  }

  useEffect(() => {
    const getReservations = async () => {
      const reservations = await apiService.get(`/api/properties/${property.id}/reservations/`)

      let dates: Date[] = []

      reservations.forEach((reservation: any) => {
        const range = eachDayOfInterval({
          start: new Date(reservation.start_date),
          end: new Date(reservation.end_date)
        })
        dates = [...dates, ...range]
      })

      setBookedDates(dates)
    }
    getReservations()
    setLoading(false)
  }, [])
    

  useEffect(() => {    
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate)

      if (dayCount && property.price_per_night) {
        const _fee = (dayCount * property.price_per_night / 100 * 5)
        setFee(_fee)
        setTotalPrice(dayCount * property.price_per_night + _fee)
        setNights(dayCount)
      } else {
        const _fee = (property.price_per_night / 100 * 5)
        setFee(_fee)
        setTotalPrice(property.price_per_night + fee)
        setNights(1)
      }
    }
  }, [dateRange])

  return (
    <aside className="mt-4 p-6 col-span-2 rounded-xl border border-gray-300 shadow-xl">
      {
        loading ? (
          <Loading />
        ) : (
          <>
            <h2 className="mb-5">${property.price_per_night} per night</h2>

            <Calendar
              value={dateRange}
              bookedDates={bookedDates}
              onChange={(value) => _setDateRange(value.selection)} 
            />

            <div className="mb-6 p-3 border border-gray-400 rounded-xl">
              <label className="block font-bold text-xs">Guests</label>
              <select 
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full -ml-1 text-xm"
              >
                {guestsRange.map((number) =>
                  <option key={number} value={number}>{number}</option>
                )}
              </select>
            </div>

            <button
              onClick={performBooking}
              className={clsx("w-full mb-6 py-6 text-center text-white rounded-xl",
                              {"bg-roomie hover:bg-roomieDark hover:cursor-pointer": !disabled,
                              "bg-gray-300 hover:cursor-not-allowed": disabled})}
              disabled={disabled}
            >
              Book
            </button>

            <div className="mb-4 flex justify-between align-center">
              <p>${property.price_per_night} * {nights} night(s)</p>
              <p>${property.price_per_night * nights}</p>
            </div>

            <div className="mb-4 flex justify-between align-center">
              <p>Roomie fee</p>
              <p>${fee}</p>
            </div>

            <div className="mt-4 flex justify-between align-center font-bold">
              <p>Total</p>
              <p>${totalPrice}</p>
            </div>
          </>
        )
      }
    </aside>
  )
}

export default ReservationSidebar