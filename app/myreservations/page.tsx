import apiService from "@/app/_libs/apiService"
import Image from "next/image"
import Link from "next/link"

const MyReservations = async () => {
  const reservations = await apiService.get('/api/auth/myreservations/')

  return (
    <main className="max-w-[2000px] mx-auto px-6 pb-6">
      <h1 className="my-6 text-2xl">My Reservations</h1>
      
      <div className="space-y-4">
        {reservations.map((reservation: any) => {
          return (
            <div
              key={reservation.id}
              className="p-5 grid grid-cols-1 md:grid-cols-4 gap-4 shadow-md border border-gray-300"
            >
              <div className="col-span-1">
                <div className="relative overflow-hidden aspect-square rounded-xl">
                  <Image 
                    src={reservation.property.image_url}
                    fill
                    className="hover:scale-110 object-cover"
                    alt="Property Picture"
                  />
                </div>
              </div>

              <div className="col-span-1 md:col-span-3 space-y-2">
                <h2 className="mb-4 text-xl">{reservation.property.title}</h2>
                
                <p><strong>Check in date:</strong> {reservation.start_date}</p>
                <p><strong>Check out date:</strong> {reservation.end_date}</p>
                
                <p><strong>Number of nights:</strong> {reservation.number_of_nights}</p>
                <p><strong>Total price:</strong> ${reservation.total_price}</p>
                
                <Link
                  href={`/properties/${reservation.property.id}`}
                  className="mt-6 inline-block cursor-pointer py-4 px-6 bg-airbnb text-white rounded-xl"
                >
                  Go to property
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </main>
  )
}

export default MyReservations