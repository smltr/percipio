import React, { useState } from "react";

interface FilterProps {
  onFilter: (filters: { [key: string]: string }) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilter }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    jobType: "",
    location: "",
    salaryRange: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter(filters);
    setShowFilters(false);
  };

  return (
    <div>
      <button onClick={() => setShowFilters(!showFilters)}>
        {showFilters ? "Close Filters" : "Filter Jobs"}
      </button>
      {showFilters && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="jobType"
            placeholder="Job Type"
            value={filters.jobType}
            onChange={handleChange}
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={filters.location}
            onChange={handleChange}
          />
          <input
            type="text"
            name="salaryRange"
            placeholder="Salary Range"
            value={filters.salaryRange}
            onChange={handleChange}
          />
          <button type="submit">Apply Filters</button>
        </form>
      )}
    </div>
  );
};

export default Filter;
