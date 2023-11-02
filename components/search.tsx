import utilStyles from '../styles/utils.module.css';
import { useState } from 'react';

const SearchComponent = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/search?query=${query}`);
      const rawData = await response.json();
      const data = Array.isArray(rawData) ? rawData : [rawData];

      const matchingResults = data.filter((result) => {
        return result.Title && result.Title.toLowerCase().includes(query.toLowerCase())
      });

      setResults(matchingResults);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setQuery(inputValue);

    handleSearch();
  };

  return (
    <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
      <input
        type="text"
        placeholder="Type movie title to search"
        className={utilStyles.searchInput}
        value={query}
        onChange={handleChange}
      />

      <ul className={utilStyles.list}>
        {results.map((result) => (
          <li className={utilStyles.listItem} key={result.imdbID}>
          <img src={result.Poster} alt={result.Title} width="300" height="300" />
          <br />
          <h1 className={utilStyles.headingLg}>Title: {result.Title}</h1>
          <h1 className={utilStyles.headingMd}>Type: {result.Type}</h1>
          <h1 className={utilStyles.headingMd}>Genre: {result.Genre}</h1>
          <h1 className={utilStyles.headingMd}>Ratings: </h1>

          <ul className={utilStyles.ratingList}>
            {result.Ratings.map((rating) => (
                <li className={utilStyles.listItem} key={rating.Source}>
                    <h4 className={utilStyles.ratingText}>{rating.Source}({rating.Value})</h4>
                </li>
            ))}
            <li><h4 className={utilStyles.ratingText}>IMDB Rating({result.imdbRating})</h4></li>
          </ul>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SearchComponent;