'use client'

import apiService from "@/app/_libs/apiService"
import PropertyListItem from "./PropertyListItem"
import useSearchModal from "@/app/_libs/useSearchModal"
import { format } from "date-fns"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from 'react'

export type PropertyListType = {
  id: string
  title: string
  image_url: string
  price_per_night: number
  is_favorite: boolean
}

type Props = {
  landlord_id?: string | null
  favorites?: boolean | null
}

const PropertyList = ({ landlord_id, favorites }: Props) => {
  const params = useSearchParams()
  
  const searchModal = useSearchModal()
  const country = searchModal.query.country
  const numGuests = searchModal.query.guests
  const numBedrooms = searchModal.query.bedrooms
  const numBathrooms = searchModal.query.bathrooms
  const checkInDate = searchModal.query.checkIn
  const checkOutDate = searchModal.query.checkOut
  const category = searchModal.query.category

  const [properties, setProperties] = useState<PropertyListType[]>([])
  
  const markFavorite = (id: string, is_favorite: boolean) => {
    const tmpProperties = properties.map((property: PropertyListType) => {
      if (property.id == id) {
        property.is_favorite = is_favorite
      }
      return property
    })
    setProperties(tmpProperties)
  }

  const getProperties = async () => {
    let url = "/api/properties/"
    if (landlord_id) {
      url += `?landlord_id=${landlord_id}`
    } else if (favorites) {
      url += "?is_favorites=true"
    } else if (searchModal.step) {
      let urlQuery = ""
      
      if (country) {
        urlQuery += "&country=" + country
      }
      if (numGuests) {
        urlQuery += "&numGuests=" + numGuests
      }
      if (numBedrooms) {
        urlQuery += "&numBedrooms=" + numBedrooms
      }
      if (numBathrooms) {
        urlQuery += "&numBathrooms=" + numBathrooms
      }
      if (checkInDate) {
        urlQuery += "&checkIn=" + format(checkInDate, "yyyy-MM-dd")
      }
      if (checkOutDate) {
        urlQuery += "&checkOut=" + format(checkOutDate, "yyyy-MM-dd")
      }
      if (category) {
        urlQuery += "&category=" + category
      }

      if (urlQuery.length) {
        console.log("Query", urlQuery)

        urlQuery = "?" + urlQuery.substring(1)
        url += urlQuery
      }
    }
    
    const tmpProperties = await apiService.get(url)
    
    setProperties(tmpProperties.data.map((property: PropertyListType) => {
      if (tmpProperties.favorites.includes(property.id)) {
        property.is_favorite = true
      } else {
        property.is_favorite = false
      }
      return property
    }))
  }
  
  useEffect(() => {
    getProperties()
  }, [searchModal.query, params])
  
  return (
    <>
      {properties.map((property) => {
        return (
          <PropertyListItem 
            key={property.id} 
            property={property}
            markFavorite={(is_favorite: boolean) => markFavorite(property.id, is_favorite)}
          />
        )
      })}
    </>
  )
}

export default PropertyList