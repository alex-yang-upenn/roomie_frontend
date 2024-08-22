'use client'

import useSearchModal from "@/app/_libs/useSearchModal"

const SearchFilters = () => {
  const searchModal = useSearchModal()

  return (
    <div 
      onClick={() => searchModal.open("location")}
      className="h-[64px] flex flex-row items-center justify-between border rounded-full"
    >
      <div className="hidden lg:block">
        <div className="flex flex-row items-center justify-between">
          <div className="cursor-pointer w-[250px] h-[64px] px-8 flex flex-col justify-center rounded-full hover:bg-gray-200">
            <p className="text-xs font-semibold">Search</p>
            <p className="text-sm">Wanted location</p>
          </div>

          <div className="cursor-pointer h-[64px] px-8 flex flex-col justify-center rounded-full hover:bg-gray-200">
            <p className="text-xs font-semibold">Check in</p>
            <p className="text-sm">Add dates</p>
          </div>

          <div className="cursor-pointer h-[64px] px-8 flex flex-col justify-center rounded-full hover:bg-gray-200">
            <p className="text-xs font-semibold">Check out</p>
            <p className="text-sm">Add dates</p>
          </div>

          <div className="cursor-pointer h-[64px] px-8 flex flex-col justify-center rounded-full hover:bg-gray-200">
            <p className="text-xs font-semibold">Who</p>
            <p className="text-sm">Add guests</p>
          </div>
        </div>
      </div>

      <div className="p-2">
        <div className="cursor-pointer p-2 bg-roomie hover:bg-roomieDark transition rounded-full text-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" viewBox="0 0 24 24" width="24" role="presentation" focusable="false" fillRule="evenodd">
            <path clipRule="evenodd" d="M16.296 16.996a8 8 0 11.707-.708l3.909 3.91-.707.707-3.909-3.909ZM18 11a7 7 0 11-14 0 7 7 0 0114 0Z" fillRule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default SearchFilters