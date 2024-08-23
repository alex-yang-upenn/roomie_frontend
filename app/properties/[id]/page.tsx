import ReservationSidebar from "@/app/_components/properties/ReservationSidebar"
import apiService from "@/app/_libs/apiService"
import { getUserId } from "@/app/_libs/actions"
import Link from "next/link"
import Image from "next/image"
import React from 'react'

const PropertyDetailPage = async ({ params } : { params : {id: string} }) => {
  const property = await apiService.get(`/api/properties/${params.id}`)
  const userId = await getUserId()

  return (
    <main className="max-w-[2000px] mx-auto px-6 pb-6">
      <div className="w-full h-[64vh] mb-4 overflow-hidden roudned-xl relative">
        <Image 
          src={property.image_url}
          fill
          className="object-cover w-full h-full"
          alt="Property Picture" />
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="py-6 pr-6 col-span-3">
          <h1 className="mb-4 text-4xl">
            {property.title}
          </h1>

          <span className="mb-6 block text-lg text-gray-600">
            {property.guests} guest(s) - {property.bedrooms} bedroom(s) - {property.bathrooms} bathroom(s)
          </span>

          <hr />

          <Link
            href={`/landlords/${property.landlord.id}`}
            className="py-6 flex items-center space-x-4"
          >
            {property.landlord.avatar_url && (
              <Image 
                src={property.landlord.avatar_url}
                width={50}
                height={50}
                className="rounded-full"
                alt="Avatar" />
            )}
            
            <p>
              <strong>{property.landlord.name}</strong> is your host
            </p>
          </Link>

          <hr />

          <p className="mt-6 text-lg">
            {property.description}
          </p>
        </div>

        <ReservationSidebar
          property={property}
          userId={userId}
        />
      </div>
    </main>
    
  )
}

export default PropertyDetailPage