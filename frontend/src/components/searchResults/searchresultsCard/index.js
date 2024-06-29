import React from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

const SearchResultsCard = ({ id, name, phone, address, website }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/details/${id}`, { state: { id, name, phone, address, website } });
  };

  return (
    <div className="search-results-card" onClick={handleClick}>
      <div className="search-results-details">
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Phone:</strong> {phone}</p>
        <p><strong>Address:</strong> {address}</p>
        <p><strong>Website:</strong> <a href={website} target="_blank" rel="noopener noreferrer">{website}</a></p>
      </div>
    </div>
  );
};

export default SearchResultsCard;
