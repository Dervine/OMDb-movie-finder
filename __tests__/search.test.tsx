import { render, screen, fireEvent } from '@testing-library/react'
import Search from '../components/search'
import '@testing-library/jest-dom'
import { mockMovieData } from '../__mocks__/apiMock';

jest.mock('../__mocks__/apiMock');

describe('Home', () => {
  it('renders the component with an input field', () => {
    render(<Search />)
 
    const inputElement = screen.getByPlaceholderText('Type movie title to search');
 
    expect(inputElement).toBeInTheDocument()
  })

  it('handles whitespace input as empty input', async () => {
    render(<Search />);

    const inputElement = screen.getByPlaceholderText('Type movie title to search');
    const whitespaceInput = '     ';

    fireEvent.change(inputElement, { target: { value: whitespaceInput } });

    expect(inputElement).toHaveValue(whitespaceInput);

    setTimeout(() => {
        expect(inputElement).toHaveValue('');

        const searchResults = screen.queryByRole('listitem');
        expect(searchResults).toBeNull();
      }, 2000);

  });

  it('displays an appropriate message for a search with no results', async () => {
    render(<Search />);

    const inputElement = screen.getByPlaceholderText('Type movie title to search');
    const searchTermWithNoResults = '`z`z`zxxxx';

    fireEvent.change(inputElement, { target: { value: searchTermWithNoResults } });

    expect(inputElement).toHaveValue(searchTermWithNoResults);

    setTimeout(() => {
        const noResultsMessage = screen.getByText('No results found');
        expect(noResultsMessage).toBeInTheDocument();
      }, 2000);

  });

  it('performs a case-insensitive search', async () => {
    render(<Search />);

    const inputElement = screen.getByPlaceholderText('Type movie title to search');
    const searchQuery = 'Guardians Of The Galaxy';

    fireEvent.change(inputElement, { target: { value: searchQuery } });

    expect(inputElement).toHaveValue(searchQuery);

    setTimeout(() => {
        const searchResults = screen.queryAllByRole('list');
        expect(searchResults).not.toHaveLength(0);

        searchResults.forEach((result) => {
            const title = result.querySelector('h1.utilStyles.headingLg');
            expect(title).not.toBeNull();
            expect(title).toBe(mockMovieData[0].Title);
        });
      }, 2000);

  });
})