import PropertyList from '@/app/_components/properties/PropertyList'
import { getUserId } from '@/app/_libs/actions'
import React from 'react'

const MyFavoritesPage = async () => {
  const userId = await getUserId()

  if (!userId) {
    return (
      <main className="max-w-[2000px] mx-auto px-6 pb-6">
        <p>You need to be authenticated...</p>
      </main>
    )
  }

  return (
    <main className="max-w-[2000px] mx-auto px-6 pb-6">
      <h1 className="my-6 text-2xl">My Favorites</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <PropertyList favorites={true}/>
      </div>
    </main>
  )
}

export default MyFavoritesPage