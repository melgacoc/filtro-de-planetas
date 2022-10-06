import React from 'react';
import './App.css';
import PlanetsProvider from './contexts/PlanetsProvider';
import Table from './components/Table';
import Header from './components/Header';

function App() {
  return (
    <PlanetsProvider>
      <Header />
      <Table />
    </PlanetsProvider>
  );
}

export default App;
