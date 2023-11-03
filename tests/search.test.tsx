import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import SearchComponent from '../components/search';

describe('SearchComponent', () => {
  it('renders the component with an input field', () => {
    render(<SearchComponent />);
    const inputElement = screen.getByPlaceholderText('Search');
    expect(inputElement).toBeInTheDocument();
  });

  it('handles search correctly when input is not empty', async () => {
    render(<SearchComponent />);
    const inputElement = screen.getByPlaceholderText('Search');
    fireEvent.change(inputElement, { target: { value: 'example' } });
    expect(inputElement).toHaveValue('example');
    
    const fetchMock = jest.spyOn(global, 'fetch');
    fetchMock.mockResolvedValue({
      json: () => Promise.resolve([{ title: 'Example Result' }]),
    });
    
    fireEvent.click(screen.getByText('Search'));

    // Wait for the component to update with the search results
    await act(async () => {
      const results = await screen.findAllByRole('listitem');
      expect(results).toHaveLength(1);
      expect(results[0]).toHaveTextContent('Example Result');
    });

    fetchMock.mockRestore();
  });

  it('clears the results when input is empty', async () => {
    render(<SearchComponent />);
    const inputElement = screen.getByPlaceholderText('Search');
    fireEvent.change(inputElement, { target: { value: 'example' } });
    expect(inputElement).toHaveValue('example');
    
    const fetchMock = jest.spyOn(global, 'fetch');
    fetchMock.mockResolvedValue({
      json: () => Promise.resolve([{ title: 'Example Result' }]),
    });
    
    fireEvent.click(screen.getByText('Search'));

    // Wait for the component to update with the search results
    await act(async () => {
      const results = await screen.findAllByRole('listitem');
      expect(results).toHaveLength(1);
      expect(results[0]).toHaveTextContent('Example Result');
    });

    fireEvent.change(inputElement, { target: { value: '' } });
    fireEvent.click(screen.getByText('Search'));

    // Wait for the component to clear the results
    await act(async () => {
      const results = await screen.queryAllByRole('listitem');
      expect(results).toHaveLength(0);
    });

    fetchMock.mockRestore();
  });
});
