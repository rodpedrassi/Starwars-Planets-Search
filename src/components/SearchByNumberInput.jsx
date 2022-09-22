import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function SearchByNumberInput() {
  const { setFilterByNum, setIsSearching } = useContext(PlanetsContext);

  const [filters, setFilters] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  const handleChange = ({ target: { value: valor, name } }) => {
    setFilters((prev) => ({
      ...prev,
      [name]: valor,
    }));
  };

  // primeiro ele manda um filtro padrão, na seguida manda o filtro digitado pelo usuario
  const search = () => {
    setFilterByNum((prev) => ({
      ...prev,
      filterByNumericValues: [
        ...prev.filterByNumericValues,
        filters,
      ],
    }));
    setIsSearching(true);
  };

  return (
    <div>
      <label htmlFor="column">
        Coluna:
        <select
          name="column"
          id="column"
          data-testid="column-filter"
          onChange={ handleChange }
          value={ filters.column }
        >
          <option>population</option>
          <option>orbital_period</option>
          <option>diameter</option>
          <option>rotation_period</option>
          <option>surface_water</option>
        </select>
      </label>

      <label htmlFor="comparison">
        Operador:
        <select
          name="comparison"
          id="comparison"
          data-testid="comparison-filter"
          onChange={ handleChange }
          value={ filters.comparison }
        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
      </label>

      <label htmlFor="value">
        Valor:
        <input
          type="number"
          name="value"
          id="value"
          data-testid="value-filter"
          onChange={ handleChange }
          value={ filters.value }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ search }
        >
          Filtrar
        </button>
      </label>
    </div>
  );
}

export default SearchByNumberInput;
