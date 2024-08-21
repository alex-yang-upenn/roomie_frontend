'use client'

import CategoriesList from './CategoriesList'
import useSearchModal, { SearchQuery } from "@/app/_libs/useSearchModal"
import { useState } from 'react'

const SearchCategories = () => {
  const searchModal = useSearchModal()
  const [category, setCategory] = useState("")

  const _setCategory = (_category: string) => {
    setCategory(_category)
    
    const query: SearchQuery = {
      country: searchModal.query.country,
      checkIn: searchModal.query.checkIn,
      checkOut: searchModal.query.checkOut,
      guests: searchModal.query.guests,
      bedrooms: searchModal.query.bedrooms,
      bathrooms: searchModal.query.bathrooms,
      category: _category
    }

    searchModal.step = "search"
    searchModal.setQuery(query)
  }

  const _resetCategory = () => {
    setCategory("")
    
    const query: SearchQuery = {
      country: searchModal.query.country,
      checkIn: searchModal.query.checkIn,
      checkOut: searchModal.query.checkOut,
      guests: searchModal.query.guests,
      bedrooms: searchModal.query.bedrooms,
      bathrooms: searchModal.query.bathrooms,
      category: ""
    }

    searchModal.step = ""
    searchModal.setQuery(query)
  }
  
  return (
    <CategoriesList 
      currentCategory={category}
      onClick={(_category: string) => {
        if (category ==_category) {
          _resetCategory()
        } else {
          _setCategory(_category)
        }
      }}
    />
  )
}

export default SearchCategories

