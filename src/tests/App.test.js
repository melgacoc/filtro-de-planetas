import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import mock from './helpers/mock';
import { TABLE, FIRST_FILTER } from './helpers/consts';
import userEvent from '@testing-library/user-event';

describe('App', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(mock),
    }));

    render(<App />);
  });

  test('Testa se uma tabela com 10 planetas é reenderiizada', () => {
    TABLE.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  test('Testa se ao digitar no input de texto os dados ão filtrados', async () => {
    const input = screen.findByTestId('name-filter');
    userEvent.type(input, 'T');
    expect(screen.getByText('Tatooine')).toBeInTheDocument();
  });

  test('Testa o input de nome', async () => {
    const input = screen.findByTestId('name-filter');
    userEvent.type(input, 't');
    expect(screen.findByText('Tatooine')).toBeTruthy();
    expect(screen.findByText('Hoth')).toBeTruthy();
    expect(screen.findByText('Coruscant')).toBeTruthy();

  });

  test('Testa os filtros numericos', async () => {
    const firstColumn = screen.getByTestId('column-filter');
    expect(firstColumn).toHaveValue('population');
    const firstComparison = screen.getByTestId('comparison-filter');
    userEvent.selectOptions(firstComparison, 'maior que');
    const filterButton = screen.getByTestId('button-filter');
    userEvent.click(filterButton);

    expect(firstColumn).toHaveValue('orbital_period');
    userEvent.selectOptions(firstColumn, 'diameter');
    userEvent.selectOptions(firstComparison, 'menor que');
    const firstValue = screen.getByTestId('value-filter');
    userEvent.type(firstValue, '20000');
    userEvent.click(filterButton);
    expect(firstColumn).toHaveValue('diameter');

    userEvent.selectOptions(firstColumn, 'rotation_period');
    userEvent.click(filterButton);
    expect(firstColumn).toHaveValue('rotation_period');

    const removeALlFilters = screen.getByTestId('button-remove-filters');
    userEvent.click(removeALlFilters);
    expect(firstColumn).toHaveValue('diameter');
  });

  test('Testa o botão de remover filtros', async () => {
    const firstColumn = screen.getByTestId('column-filter');
    expect(firstColumn).toHaveValue('population');
    const filterButton = screen.getByTestId('button-filter');
    userEvent.click(filterButton);
    expect(firstColumn).toHaveValue('orbital_period');

    const removeButton = screen.getByText(/Remover Filtro/i);
    userEvent.click(removeButton);
    expect(firstColumn).toHaveValue('population');
  });

  test('Testa o funcionamento de vários filtros', async () => {
    const column = screen.getByTestId('column-filter');
    userEvent.selectOptions(column, 'rotation_period');
    const comparison = screen.getByTestId('comparison-filter');
    userEvent.selectOptions(comparison, 'menor que');
    const value = screen.getByTestId('value-filter');
    userEvent.type(value, '13');
    userEvent.click(screen.getByTestId('button-filter'));

    expect(screen.findByText('Bespin')).toBeTruthy();
  });

  it('Testa se o input nome é responivo', async () => {
    const filtered = mock.results[0];
    
    userEvent.type(screen.getByTestId('name-filter'), filtered.name);
    
    planets.forEach(({ name }, index) => {
      if (index === 0) {
        expect(screen.getByRole('cell', { name })).toBeInTheDocument();
      } else {
        expect(screen.queryByRole('cell', { name })).not.toBeInTheDocument();
      }
    });
  });
});