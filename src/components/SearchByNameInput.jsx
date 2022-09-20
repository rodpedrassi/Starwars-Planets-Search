import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function SearchByNameInput() {
  const { filter, setFilter } = useContext(PlanetsContext);
  const { filterByName: { name } } = filter;

  const handleChangeSearch = (event) => {
    const { target: { value } } = event;
    setFilter((prev) => ({
      ...prev,
      filterByName: {
        name: value,
      },
    }));
  };

  return (
    <div>
      <input
        type="text"
        data-testid="name-filter"
        placeholder="Pesquise por nome..."
        value={ name }
        onChange={ handleChangeSearch }
      />
    </div>
  );
}

export default SearchByNameInput;
