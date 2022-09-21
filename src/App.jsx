import React from 'react';
import './App.css';
import SearchByNameInput from './components/SearchByNameInput';
import SearchByNumberInput from './components/SearchByNumberInput';
import Table from './components/Table';
import PlanetsProvider from './context/PlanetsProvider';
import getStarWarsPlanets from './services/starwarsApi';

function App() {
  getStarWarsPlanets();
  return (
    <PlanetsProvider>
      <SearchByNameInput />
      <SearchByNumberInput />
      <Table />
    </PlanetsProvider>
  );
}

export default App;
