import React, { useState } from 'react';
import PropTypes from 'prop-types';
import getStarWarsPlanets from '../services/starwarsApi';
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

  const fetchPlanets = async () => {
    const response = await getStarWarsPlanets();
    response.forEach((planet) => {
      setPlanets((prev) => [...prev, planet]);
    });
  };

  const contextType = {
    planets,
    fetchPlanets,
    filter,
    setFilter,
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
