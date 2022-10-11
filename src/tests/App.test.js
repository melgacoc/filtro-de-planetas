import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import mock from './helpers/mock';
import { TABLE } from './helpers/consts';
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
    userEvent.type(input, 'Tatooine');
    expect(screen.getByText('Tatooine')).toBeInTheDocument();
  });
});

