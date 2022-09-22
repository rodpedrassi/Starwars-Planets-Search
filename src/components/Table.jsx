import React, { useContext, useEffect } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import getStarWarsPlanets from '../services/starwarsApi';

function Table() {
  const { planets, setPlanets, filter, filterByNum,
    isSearching } = useContext(PlanetsContext);
  const { filterByName: { name } } = filter;
  const { filterByNumericValues } = filterByNum;
  // const [filteredPlanets, setFilteredPlanets] = useState([]);

  useEffect(() => {
    const fetchPlanets = async () => {
      const response = await getStarWarsPlanets();
      response.forEach((planet) => {
        setPlanets((prev) => [...prev, planet]);
      });
    };
    fetchPlanets();
  }, []);

  const handleNumericFilters = (linha) => {
    const auxBools = [];
    if (isSearching) {
      filterByNumericValues.forEach((numFilter) => {
        if (numFilter.comparison === 'maior que') {
          auxBools.push(Number(linha[numFilter.column]) >= Number(numFilter.value));
        }
        if (numFilter.comparison === 'menor que') {
          auxBools.push(Number(linha[numFilter.column]) <= Number(numFilter.value));
        }
        if (numFilter.comparison === 'igual a') {
          auxBools.push(Number(linha[numFilter.column]) === Number(numFilter.value));
        }
      });
    }
    return auxBools.every((el) => el);
  };

  const renderPlanets = (planetsFiltered) => (
    planetsFiltered.filter((planet) => planet.name.toLowerCase()
      .includes(name.toLowerCase()))
      .filter(handleNumericFilters)
      .map((planet) => (
        <tr key={ planet.name }>
          <td>{planet.name}</td>
          <td>{planet.rotation_period}</td>
          <td>{planet.orbital_period}</td>
          <td>{planet.diameter}</td>
          <td>{planet.climate}</td>
          <td>{planet.gravity}</td>
          <td>{planet.terrain}</td>
          <td>{planet.surface_water}</td>
          <td>{planet.population}</td>
          <td>{planet.films}</td>
          <td>{planet.created}</td>
          <td>{planet.edited}</td>
          <td>{planet.url}</td>
        </tr>
      )));

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {renderPlanets(planets)}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
