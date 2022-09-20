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

  const fetchPlanets = async () => {
    const response = await getStarWarsPlanets();
    response.forEach((planet) => {
      setPlanets((prev) => [...prev, planet]);
      console.log(planet);
    });
  };

  const contextType = {
    ...planets,
    fetchPlanets,
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
