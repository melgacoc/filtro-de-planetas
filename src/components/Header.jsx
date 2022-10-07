import React, { useContext } from 'react';
import PlanetsContext from '../contexts/PlanetsContext';

function Header() {
  const { filterByName,
    numberFilter,
    filterByNumbers,
    params } = useContext(PlanetsContext);

  return (
    <div>
      <input
        name="nameFilter"
        onChange={ ({ target }) => filterByName(target) }
        placeholder="Nome do planeta"
        type="text"
        data-testid="name-filter"
      />
      <section>
        <select
          name="column"
          data-testid="column-filter"
          onChange={ ({ target }) => params(target) }
          value={ numberFilter.column }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
        <select
          name="comparison"
          data-testid="comparison-filter"
          onChange={ ({ target }) => params(target) }
          value={ numberFilter.comparison }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          name="value"
          type="number"
          data-testid="value-filter"
          onChange={ ({ target }) => params(target) }
          value={ numberFilter.value }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ (event) => filterByNumbers(event) }
        >
          Filtrar
        </button>
      </section>
    </div>
  );
}

export default Header;
