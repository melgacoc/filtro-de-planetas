import React, { useContext } from 'react';
import PlanetsContext from '../contexts/PlanetsContext';

function Header() {
  const { filterByName,
    filterByNumber,
    numberFilter } = useContext(PlanetsContext);

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
          data-testid="column-filter"
          onChange={ ({ target }) => filterByNumber(target) }
          value={ numberFilter.column }
        >
          <option value="population">População</option>
          <option value="orbital_period">Período orbital</option>
          <option value="diameter">Diâmetro</option>
          <option value="rotation_period">Período de rotação</option>
          <option value="surface_water">Superfície de água</option>
        </select>
        <select
          data-testid="comparison-filter"
          onChange={ ({ target }) => filterByNumber(target) }
          value={ numberFilter.comparison }
        >
          <option value="maior que">Maior que</option>
          <option value="menor que">Menor que</option>
          <option value="igual a">Igual a</option>
        </select>
        <input
          name="value"
          type="number"
          data-testid="value-filter"
          onChange={ ({ target }) => filterByNumber(target) }
          value={ numberFilter.value }
        />
        <button
          type="button"
          data-testid="button-filter"
        >
          Filtrar
        </button>
      </section>
    </div>
  );
}

export default Header;
