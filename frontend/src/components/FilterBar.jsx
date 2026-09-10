function FilterBar({
  propertyType,
  developer,
  developers,
  propertyTypes,
  onPropertyTypeChange,
  onDeveloperChange,
  onReset,
}) {
  return (
    <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
      <select
        value={propertyType}
        onChange={(e) => onPropertyTypeChange(e.target.value)}
        className="rounded border  bg-white px-3 py-2 text-xs outline-none focus:border-black"
      >
        <option value="">Property Type</option>

        {propertyTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      <select
        value={developer}
        onChange={(e) => onDeveloperChange(e.target.value)}
        className="rounded border  bg-white px-3 py-2 text-xs outline-none focus:border-black"
      >
        <option value="">Developer</option>

        {developers.map((developerName) => (
          <option key={developerName} value={developerName}>
            {developerName}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FilterBar;
