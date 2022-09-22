import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
//   const [planets, setPlanets] = useState([{
//     climate: '',
//     created: '',
//     diameter: '',
//     edited: '',
//     films: [],
//     gravity: '',
//     name: '',
//     orbitalPeriod: '',
//     population: '',
//     rotationPeriod: '',
//     surfaceWater: '',
//     terrain: '',
//     url: '',
//   }]);
  const [planets, setPlanets] = useState([]);
  const [filter, setFilter] = useState({
    filterByName: {
      name: '',
    },
  });
  const [filterByNum, setFilterByNum] = useState({
    filterByNumericValues: [
      {
        column: 'population',
        comparison: 'maior que',
        value: 0,
      },
    ],
  });

  const [isSearching, setIsSearching] = useState(false);

  const contextType = {
    planets,
    setPlanets,
    filter,
    setFilter,
    filterByNum,
    setFilterByNum,
    isSearching,
    setIsSearching,
  };
  return (
    <PlanetsContext.Provider value={ contextType }>
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
