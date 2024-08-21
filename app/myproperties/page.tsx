import PropertyList from "@/app/_components/properties/PropertyList"
import { getUserId } from "@/app/_libs/actions"

const MyPropertiesPage = async () => {
  const userId = await getUserId()
  
  return (
    <main className="max-w-[2000px] mx-auto px-6 pb-6">
      <h1 className="my-6 text-2xl">My Properties</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <PropertyList landlord_id={userId}/>
      </div>
    </main>
  )
}

export default MyPropertiesPage