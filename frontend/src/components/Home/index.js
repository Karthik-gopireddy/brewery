import React, { useState } from 'react';
import './index.css';
import searchImage from "../../components/Searchimages.jpg";
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [searchType, setSearchType] = useState('Name');
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
  };

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = async () => {
    if (query.trim() === '') {
      alert('Please enter a search query.');
      return;
    }

    const url = `https://api.openbrewerydb.org/v1/breweries?by_${searchType.toLowerCase()}=${query}`;
    const response = await fetch(url);
    const data = await response.json();

    // Navigate to SearchResults page and pass data as state
    navigate('/searchresults', { state: { data } });
  };

  return (
    <div className="homepage">
      <div className="image-container">
        <img className='searchimage' src={searchImage} alt="searchImage" />
      </div>
      <div className="search-container">
        <label className='labelinsearchcontainer'>Select the option</label>
        <select className='selectdropdown' value={searchType} onChange={handleSearchTypeChange}>
          <option value="Name">Name</option>
          <option value="City">City</option>
          <option value="Type">Type</option>
        </select>
        <label className='labelinsearchcontainer'>Search</label>
        <input
          className='searchinput'
          type="text"
          value={query}
          onChange={handleQueryChange}
          placeholder="Search..."
        /><br/>
        <button className='buttoninsearchcontainer' onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
};

export default HomePage;
