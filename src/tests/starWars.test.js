import React from 'react';
import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import mockData from './mock/mockPlanets';

describe('Suite de testes StarWars Planet Search', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockReturnValue(mockData),
    });
  });

  test('Checa se os planetas foram redenrizados corretamente', async () => {
    render(<App/>);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));
    expect(screen.getAllByRole('row')).toHaveLength(11);
  });

  test('Checa o filtro por nome', async () => {
    render(<App/>);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));

    userEvent.type(screen.getByTestId('name-filter'), 'oo');
    expect(screen.getAllByRole('row')).toHaveLength(3);
  });

  test('Checa o filtro por numero ', async () => {
    render(<App/>);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));

    const column = screen.getByTestId('column-filter')
    const comparison = screen.getByTestId('comparison-filter');
    const value = screen.getByTestId('value-filter');

    userEvent.selectOptions(column, 'surface_water');
    userEvent.selectOptions(comparison, 'igual a');
    userEvent.type(value, 1);
    userEvent.click(screen.getByRole('button', { name: 'Filtrar' }))

    expect(screen.getAllByRole('row')).toHaveLength(2);
  });

});