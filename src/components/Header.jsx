import React, { useContext } from 'react';
import PlanetsContext from '../contexts/PlanetsContext';

function Header() {
  const { filterByName,
    numberFilter,
    setFilterValue,
    params,
    columnParam,
    moreFilters,
    removeAllFilters,
    removeFilter } = useContext(PlanetsContext);

  const renderColumns = () => columnParam.map((e) => (
    <option
      key={ e }
      value={ e }
    >
      { e }
    </option>
  ));

  const renderSelectedFilters = () => moreFilters.map((e) => {
    const { column, comparison, value } = e;
    return (
      <div
        data-testid="filter"
        key={ e.index }
      >
        <span>
          { column }
          {' '}
        </span>
        <span>
          { comparison }
          {' '}
        </span>
        <span>{ value }</span>
        <button
          type="button"
          onClick={ () => removeFilter(column) }
        >
          X
        </button>
      </div>
    );
  });

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
          { renderColumns() }
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
          onClick={ () => setFilterValue() }
        >
          Filtrar
        </button>
        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ () => removeAllFilters() }
        >
          Limpar filtros
        </button>
      </section>
      <section>
        { renderSelectedFilters() }
      </section>
    </div>
  );
}

export default Header;
