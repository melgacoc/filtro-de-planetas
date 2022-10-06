import React, { useContext } from 'react';
import PlanetsContext from '../contexts/PlanetsContext';

function Header() {
  const { filterByName } = useContext(PlanetsContext);

  return (
    <div>
      <input
        name="nameFilter"
        onChange={ ({ target }) => filterByName(target) }
        placeholder="Nome do planeta"
        type="text"
        data-testid="name-filter"
      />
    </div>
  );
}

export default Header;
