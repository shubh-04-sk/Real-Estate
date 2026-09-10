function PropertyCard({ property, onContact }) {
  return (
    <div className="overflow-hidden rounded-sm border border-gray-200 bg-white">
      <img
        src={property.property_image}
        alt={property.title}
        className="h-52 w-full object-cover"
      />

      <div className="p-3">
        <h3 className="text-sm font-medium text-gray-900">{property.title}</h3>

        <p className="mt-1 text-xs text-gray-500">By {property.developer}</p>

        <p className="mt-1 text-xs text-gray-500">{property.area}</p>

        <p className="mt-2 text-sm font-semibold text-gray-900">
          {property.currency} {property.property_price.toLocaleString()}
        </p>

        <button
          onClick={() => onContact(property)}
          className="mt-3 w-full rounded border border-gray-400 py-1.5 text-xs text-gray-700 transition hover:bg-black hover:text-white"
        >
          Contact
        </button>
      </div>
    </div>
  );
}

export default PropertyCard;
