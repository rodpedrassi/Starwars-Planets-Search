import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function SearchByNumberInput() {
  const { setFilterByNum, setIsSearching,
    filterByNum } = useContext(PlanetsContext);
  const { filterByNumericValues } = filterByNum;

  const [options, setOptions] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ]);

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
      // ...prev,
      filterByNumericValues: [
        ...prev.filterByNumericValues,
        filters,
      ],
    }));
    setIsSearching(true);
    setOptions((prev) => (prev.filter((e) => e !== filters.column)));
    setFilters((prev) => ({ ...prev, column: options[0] }));
  };

  const resetFilters = () => {
    setOptions(['population', 'orbital_period', 'diameter',
      'rotation_period', 'surface_water']);
    setFilterByNum({ filterByNumericValues: [
      {
        column: 'population',
        comparison: 'maior que',
        value: 0,
      },
    ] });
  };

  const removeSelectedFilter = () => {

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
          {
            options.map((option) => <option key={ option }>{option}</option>)
          }
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
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ resetFilters }
      >
        Resetar Filtros
      </button>
      {
        filterByNumericValues.map((filter, index) => {
          if (index > 0) {
            return (
              <div data-testid="filter" key={ index }>
                <p>
                  {filter.column}
                  |
                  {filter.comparison}
                  |
                  {filter.value}
                </p>
                <button
                  onClick={ removeSelectedFilter }
                  type="button"
                >
                  X
                </button>
              </div>
            );
          }

          return <span key={ filter.column } />;
        })
      }

    </div>
  );
}

export default SearchByNumberInput;
