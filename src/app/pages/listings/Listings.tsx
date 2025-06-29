import { RequestInfo } from "rwsdk/worker";
import { PropertySearch } from "@/components/home/PropertySearch";
import { PropertyService, type PropertySearchParams } from "@/app/services/PropertyService";
import { PropertyGrid } from "@/components/listings/PropertyGrid";
import { Pagination } from "@/components/listings/Pagination";
import { SearchResults } from "@/components/listings/SearchResults";

export async function Listings({ request }: RequestInfo) {
  // Parse URL search parameters
  const url = new URL(request.url);
  const searchParams = PropertyService.parseSearchParams(url.searchParams);
  
  // Fetch properties based on search parameters
  const { properties, total, page, totalPages } = await PropertyService.searchProperties(searchParams);

  return (
    <div className="min-h-screen bg-base-100">
      {/* Search Section */}
      <PropertySearch compact/>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <SearchResults 
          total={total}
          page={page}
          searchParams={searchParams}
        />

        {/* Property Grid */}
        <PropertyGrid properties={properties} />

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination 
            currentPage={page}
            totalPages={totalPages}
            searchParams={searchParams}
          />
        )}
      </div>
    </div>
  );
}
