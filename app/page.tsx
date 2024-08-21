import SearchCategories from "./_components/categories/SearchCategories";
import PropertyList from "./_components/properties/PropertyList"

export default function Home() {
  return (
    <main className="max-w-[2000px] mx-auto px-6">
      <SearchCategories />
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <PropertyList />
      </div>
    </main>
  );
}
