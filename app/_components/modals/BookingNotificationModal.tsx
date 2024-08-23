"use client"

import NotificationModal from "./NotificationModal"
import useBookingNotificationModal from "@/app/_libs/useBookingNotification"
import format from "date-fns/format"

const BookingNotificationModal = () => {
  const bookingNotificationModal = useBookingNotificationModal()

  return (
    <NotificationModal
      label={bookingNotificationModal.info.success ? "Booking success!": "Something went wrong..."}
      isOpen={bookingNotificationModal.isOpen}
      onClose={bookingNotificationModal.close}
    >
      {bookingNotificationModal.info.success ? (
        <div className="text-sm space-y-2">
          <p>Thank you for your booking!</p>

          <p>
            You booked {bookingNotificationModal.info.propertyName} from {" "}
            {format(bookingNotificationModal.info.startDate, "yyyy-MM-dd")} to {" "}
            {format(bookingNotificationModal.info.startDate, "yyyy-MM-dd")} for {" "}
            ${bookingNotificationModal.info.totalPrice}
          </p>

          <p>
            {bookingNotificationModal.info.guests} guest(s) - {" "}
            {bookingNotificationModal.info.bedrooms} bedroom(s) - {" "}
            {bookingNotificationModal.info.bathrooms} bathroom(s)
          </p>
        </div>
      ) : (
        <div className="text-sm space-y-2">
          <p>Sorry, we were unable to process your booking</p>
        </div>
      )}
    </NotificationModal>
  )
}

export default BookingNotificationModal