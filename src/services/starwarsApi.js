const PLANETS_ENDPOINT = 'https://swapi.dev/api/planets';

const removeKeyResidents = (results) => {
//   const filteredResult = results.filter((e) => delete e.residents);
  const filteredResult = results.map(({ residents, ...otherKeys }) => otherKeys);
  return filteredResult;
};

const getStarWarsPlanets = async () => {
  const response = await fetch(PLANETS_ENDPOINT);
  const json = await response.json();
  const { results } = json;
  const filteredResult = removeKeyResidents(results);
  //   console.log(filteredResult);
  return filteredResult;
};

export default getStarWarsPlanets;
