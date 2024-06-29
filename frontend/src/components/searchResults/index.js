import React from 'react';
import SearchResultsCard from "./searchresultsCard";
import { useLocation, Link } from 'react-router-dom';
import './index.css';

const SearchResults = () => {
  const location = useLocation();

  if (!location.state) {
    // Show a message or prompt to search again if no data is available
    return (
      <div className="search-results">
        <h1>Search Results</h1>
        <p>No search results available. Please go back to the <Link to="/">home page</Link> and perform a search.</p>
      </div>
    );
  }

  const { data } = location.state;

  return (
    <div className="search-results">
      <h1>Search Results</h1><br/><br/>
      <div className='searchresultcarddetails'>
      {data.map((brewery) => (
        <SearchResultsCard
          key={brewery.id}
          id={brewery.id}
          name={brewery.name}
          phone={brewery.phone}
          address={`${brewery.street}, ${brewery.city}, ${brewery.state}`}
          website={brewery.website_url}
        />
      ))}
      </div>
    </div>
  );
};

export default SearchResults;
