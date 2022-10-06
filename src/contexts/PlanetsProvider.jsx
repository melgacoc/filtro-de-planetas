import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import fetchPlanetsApi from '../helpers/planetsApi';

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    const request = async () => {
      const response = await fetchPlanetsApi();
      setData(response);
    };
    request();
  }, []);

  const filterByName = (target) => {
    setNameFilter(target.value);
  };

  useEffect(() => {
    const dataByName = data.filter((e) => e.name.includes(nameFilter));
    setFilter(dataByName);
  }, [nameFilter, data]);

  const contextValue = { data, filterByName, nameFilter, filter };

  return (
    <PlanetsContext.Provider value={ contextValue }>
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
