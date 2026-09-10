import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import FilterBar from "../components/FilterBar";
import PropertyCard from "../components/PropertyCard";
import Pagination from "../components/Pagination";
import { getProperties } from "../services/propertyService";

import ContactModal from "../components/ContactModal";
import Footer from "../components/Footer";

function Home() {
  const [properties, setProperties] = useState([]);
  const [propertyType, setPropertyType] = useState("");
  const [developer, setDeveloper] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 9;

  const [showContactModal, setShowContactModal] = useState(false);

  // Fetch data
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);

        const result = await getProperties();

        setProperties(result.data);
      } catch (error) {
        console.error(error);
        setError("Failed to load properties.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const developers = [
    ...new Set(properties.map((property) => property.developer)),
  ];

  const propertyTypes = [
    ...new Set(properties.map((property) => property.property_type)),
  ];

  const filteredProperties = properties.filter((property) => {
    const matchesType =
      propertyType === "" || property.property_type === propertyType;

    const matchesDeveloper =
      developer === "" || property.developer === developer;

    return matchesType && matchesDeveloper;
  });

  // -
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

  const startIndex = (currentPage - 1) * propertiesPerPage;

  const currentProperties = filteredProperties.slice(
    startIndex,
    startIndex + propertiesPerPage
  );

  // Reset filte
  const handleReset = () => {
    setPropertyType("");
    setDeveloper("");
    setCurrentPage(1);
  };

  const handleContact = (property) => {
    console.log("Contact property:", property);

    setShowContactModal(true);
  };
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-12">
        <h1 className="text-center text-3xl font-medium text-gray-900">
          Discover the Best Properties
        </h1>

        <FilterBar
          propertyType={propertyType}
          developer={developer}
          developers={developers}
          propertyTypes={propertyTypes}
          onPropertyTypeChange={(value) => {
            setPropertyType(value);
            setCurrentPage(1);
          }}
          onDeveloperChange={(value) => {
            setDeveloper(value);
            setCurrentPage(1);
          }}
          onReset={handleReset}
        />

        <div className="mt-8 flex items-center justify-between">
          <p className="text-xs text-gray-600">
            {filteredProperties.length} Properties Found
          </p>

          <button
            onClick={handleReset}
            className="text-xs text-gray-600 underline hover:text-black"
          >
            Reset All Filters
          </button>
        </div>

        {loading && (
          <div className="flex justify-center py-20">
            <p className="text-sm text-gray-500">Loading properties...</p>
          </div>
        )}

        {!loading && error && (
          <div className="py-20 text-center">
            <p className="text-sm text-red-500">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {currentProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onContact={handleContact}
                />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </main>

      <Footer />
      {showContactModal && (
        <ContactModal onClose={() => setShowContactModal(false)} />
      )}
    </div>
  );
}

export default Home;
