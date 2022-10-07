import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import fetchPlanetsApi from '../helpers/planetsApi';

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [filter, setFilter] = useState([]);
  const [numberFilter, setNumberFilter] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  console.log(numberFilter);

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
  const filterByNameParam = useCallback(() => {
    const dataByName = data.filter((e) => e.name.includes(nameFilter));
    setFilter(dataByName);
  }, [nameFilter, data]);

  useEffect(() => {
    filterByNameParam();
  }, [filterByNameParam]);

  const params = (target) => {
    setNumberFilter((prevNumberFilter) => ({ ...prevNumberFilter,
      [target.name]: target.value }));
  };

  const filterByNumbers = useCallback(() => {
    const dataByNumber = data.filter((e) => {
      const number = Number(e[numberFilter.column]);
      const value = Number(numberFilter.value);
      switch (numberFilter.comparison) {
      case 'maior que':
        return number > value;
      case 'menor que':
        return number < value;
      case 'igual a':
        return number === value;
      default:
        return false;
      }
    });
    setFilter(dataByNumber);
  }, [data, numberFilter]);

  const contextValue = { data,
    filterByName,
    nameFilter,
    filter,
    numberFilter,
    filterByNumbers,
    params };

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
