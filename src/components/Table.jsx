import React, { useContext, useEffect, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Table() {
  const { planets, fetchPlanets, filter, filterByNum } = useContext(PlanetsContext);
  const { filterByName: { name } } = filter;
  const { filterByNumericValues } = filterByNum;
  const [filteredPlanets, setFilteredPlanets] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await fetchPlanets();
      console.log(planets);
      setFilteredPlanets(planets);
      console.log(filteredPlanets);
    }
    fetchData();
  }, []);

  const renderPlanets = (planetsFiltered) => (
    planetsFiltered.map((planet) => (
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

  useEffect(() => {
    const planetsFiltered = planets.filter((e) => e.name.toLowerCase()
      .includes(name.toLowerCase()));
    setFilteredPlanets(planetsFiltered);
  }, [name]);

  useEffect(() => {
    let index = 1;
    if (filterByNumericValues.length > 1) {
      const { column, comparison, value } = filterByNumericValues[index];
      // console.log(column, comparison, value);
      const newFilter = filteredPlanets.filter((e) => e[column] > value);
      // console.log(newFilter);
      setFilteredPlanets(newFilter);
      index += 1;
    }
  }, [filterByNumericValues]);

  return (
    <div>
      {/* {console.log(filterByNumericValues)} */}
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
          { name.length === 0 ? renderPlanets(planets) : renderPlanets(filteredPlanets)}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
