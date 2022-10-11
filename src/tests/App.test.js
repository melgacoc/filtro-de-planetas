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

  test('', async () => {
    const input = screen.findByTestId('name-filter');
    userEvent.type(input, 't');
    expect(screen.findByText('Tatooine')).toBeInTheDocument();
    expect(screen.findByText('Hoth')).toBeInTheDocument();
    expect(screen.findByText('Coruscant')).toBeInTheDocument();
  });

  test('Testa os filtros numericos', async () => {
    const firstColumn = screen.getByTestId('column-filter');
    expect(firstColumn).toHaveValue('population');
    const filterButton = screen.getByTestId('button-filter');
    userEvent.click(filterButton);

    expect(firstColumn).toHaveValue('orbital_period');
    userEvent.selectOptions(firstColumn, 'diameter');
    userEvent.click(filterButton);
    expect(firstColumn).toHaveValue('diameter');

    userEvent.selectOptions(firstColumn, 'rotation_period');
    userEvent.click(filterButton);
    expect(firstColumn).toHaveValue('rotation_period');

    const removeALlFilters = screen.getByTestId('button-remove-filters');
    userEvent.click(removeALlFilters);
    expect(firstColumn).toHaveValue('diameter');
  });

  test('', async () => {
    const firstColumn = screen.getByTestId('column-filter');
    expect(firstColumn).toHaveValue('population');
    const filterButton = screen.getByTestId('button-filter');
    userEvent.click(filterButton);
    expect(firstColumn).toHaveValue('orbital_period');

    const removeButton = screen.getByText(/Remover Filtro/i);
    userEvent.click(removeButton);
    expect(firstColumn).toHaveValue('population');
  });
});

