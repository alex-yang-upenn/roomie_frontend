'use client'

import Modal from './Modal'
import SelectCountry, { SelectCountryValue } from "@/app/_components/forms/SelectCountry"
import Calendar from '@/app/_components/forms/Calendar'
import CustomButton from '@/app/_components/forms/CustomButton'
import useSearchModal, { SearchQuery } from '@/app/_libs/useSearchModal'
import { Range } from "react-date-range"
import React, { useState } from 'react'

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection"
}

const SearchModal = () => {
  const searchModal = useSearchModal()

  const [country, setCountry] = useState<SelectCountryValue>()
  const [dateRange, setDateRange] = useState<Range>(initialDateRange)
  const [numGuests, setNumGuests] = useState<string>("1")
  const [numBedrooms, setNumBedrooms] = useState<string>("1")
  const [numBathrooms, setNumBathrooms] = useState<string>("1")

  const _setDateRange = (selection: Range) => {
    if (searchModal.step === "checkin") {
      searchModal.open("checkout")
    } else if (searchModal.step === "checkout") {
      searchModal.open("details")
    }

    setDateRange(selection)
  }

  const closeAndSearch = () => {
    const newSearchQuery: SearchQuery = {
      country: country?.label,
      checkIn: dateRange.startDate,
      checkOut: dateRange.endDate,
      guests: parseInt(numGuests),
      bedrooms: parseInt(numBedrooms),
      bathrooms: parseInt(numBathrooms),
      category: ""
    }

    searchModal.setQuery(newSearchQuery)
    searchModal.close()
  }

  return (
    <Modal
      label="Search"
      isOpen={searchModal.isOpen}
      onClose={searchModal.close}
    >
      {searchModal.step == "location" ? (
        <>
          <h2 className="mb-6 text-2xl">Where do you want to go?</h2>
          
          <SelectCountry 
            value={country}
            onChange={(value: SelectCountryValue) => setCountry(value)} 
          />

          <div className="mt-6 flex flex-row gap-4">
            <CustomButton
              label="Check-in date ->"
              onClick={() => searchModal.open("checkin")} 
            />
          </div>
        </>
      ) : searchModal.step == "checkin" ? (
        <>
          <h2 className="mb-6 text-2xl">When do you want to check-in?</h2>

          <Calendar
            value={dateRange}
            onChange={(value) => _setDateRange(value.selection)}
          />

          <div className="mt-6 flex flex-row gap-4">
            <CustomButton
              label="<- Location"
              onClick={() => searchModal.open("location")} 
            />
            
            <CustomButton
              label="Check-out date ->"
              onClick={() => searchModal.open("checkout")} 
            />
          </div>
        </>
      ) : searchModal.step === "checkout" ? (
        <>
          <h2 className="mb-6 text-2xl">When do you want to check-out?</h2>

          <Calendar
            value={dateRange}
            onChange={(value) => _setDateRange(value.selection)}
          />

          <div className="mt-6 flex flex-row gap-4">
            <CustomButton
              label="<- Check-in"
              onClick={() => searchModal.open("checkin")} 
            />
            
            <CustomButton
              label="Details ->"
              onClick={() => searchModal.open("details")} 
            />
          </div>
        </>
      ) : searchModal.step === "details" ? (
        <>
          <h2 className="mb-6 text-2xl">Details</h2>

          <div className="space-y-4">
            <div className="space-y-4">
              <label>Number of guests:</label>
              <input
                type="number"
                min="1"
                value={numGuests}
                placeholder="Number of guests..."
                onChange={(e) => setNumGuests(e.target.value)}
                className="w-full h-14 px-4 border border-gray-300 rounded-xl"
              />
            </div>

            <div className="space-y-4">
              <label>Number of bedrooms:</label>
              <input
                type="number"
                min="1"
                value={numBedrooms}
                placeholder="Number of bedrooms..."
                onChange={(e) => setNumBedrooms(e.target.value)}
                className="w-full h-14 px-4 border border-gray-300 rounded-xl"
              />
            </div>

            <div className="space-y-4">
              <label>Number of bathrooms:</label>
              <input
                type="number"
                min="1"
                value={numBathrooms}
                placeholder="Number of bedrooms..."
                onChange={(e) => setNumBathrooms(e.target.value)}
                className="w-full h-14 px-4 border border-gray-300 rounded-xl"
              />
            </div>
          </div>
         
          <div className="mt-6 flex flex-row gap-4">
            <CustomButton
              label="<- Check-out"
              onClick={() => searchModal.open("checkout")} 
            />
            
            <CustomButton
              label="Search"
              onClick={closeAndSearch} 
            />
          </div>
        </>
      ) : (
        <></>
      )}
    </Modal>
  )
}

export default SearchModal