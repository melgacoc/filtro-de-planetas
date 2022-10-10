import React, { useEffect, useState } from 'react';
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
  const [moreFilters, setMoreFilters] = useState([]);
  const [columnParam, setColumnParam] = useState(['orbital_period', 'population',
    'diameter', 'rotation_period', 'surface_water']);

  console.log(filter);

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

  const params = (target) => {
    setNumberFilter((prevNumberFilter) => ({ ...prevNumberFilter,
      [target.name]: target.value }));
  };

  const setFilterValue = () => {
    setMoreFilters((prevMoreFilters) => [...prevMoreFilters, numberFilter]);
    const attColumnParam = columnParam.filter((e) => e !== numberFilter.column);
    setColumnParam(attColumnParam);
  };

  useEffect(() => {
    // adaptei um trecho de código
    const comp = {
      'maior que': (x, y) => Number(x) > Number(y),
      'menor que': (x, y) => Number(x) < Number(y),
      'igual a': (x, y) => Number(x) === Number(y),
    };
    const dataByName = data.filter((e) => e.name.includes(nameFilter));
    let filtered = dataByName;
    if (moreFilters.length > 0) {
      moreFilters.forEach((e) => {
        const { column, comparison, value } = e;
        const filteredValue = filtered
          .filter((f) => comp[comparison](f[column], value));
        filtered = [...filteredValue];
      });
      setFilter([...filtered]);
    } else {
      setFilter(filtered);
    }
  }, [moreFilters, data, nameFilter]);

  const contextValue = { data,
    filterByName,
    nameFilter,
    filter,
    numberFilter,
    params,
    setFilterValue,
    columnParam };

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
