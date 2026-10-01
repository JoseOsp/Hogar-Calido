import React, { useState } from 'react';

const AdvancedSearch = ({ onSearch }) => {
  const [cityOrName, setCityOrName] = useState('');
  const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch({ cityOrName, ...dateRange });
  };

  return (
    <form onSubmit={handleSearchSubmit} className="search-container bg-white p-4 rounded shadow-md flex gap-4 items-center">
      <input 
        type="text" 
        placeholder="¿A dónde vamos o qué buscas?" 
        value={cityOrName}
        onChange={(e) => setCityOrName(e.target.value)}
        className="border p-2 rounded flex-1"
      />
      <input 
        type="date" 
        onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
        className="border p-2 rounded"
      />
      <input 
        type="date" 
        onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
        className="border p-2 rounded"
      />
      <button type="submit" className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700">
        Buscar
      </button>
    </form>
  );
};

export default AdvancedSearch;