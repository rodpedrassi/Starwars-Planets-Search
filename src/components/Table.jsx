import React, { useContext, useEffect } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Table() {
  const planets = useContext(PlanetsContext);

  useEffect(() => {
    planets.fetchPlanets();
  }, []);

  return (
    <div>
      {/* {console.log(planets)}

      {planets.map((planet) => <p key={ planet.name }>{planet.name}</p>)} */}
    </div>
  );
}

export default Table;
