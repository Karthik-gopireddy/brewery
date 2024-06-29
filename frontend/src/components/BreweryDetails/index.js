import React, { useState, useEffect } from 'react';
import './index.css';
import url_24 from '../url';

const BreweryDetails = ({ brewery }) => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [newReviewer, setNewReviewer] = useState('');
  const [newRating, setNewRating] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${url_24}/reviewdetails/${brewery.id}`);
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [brewery.id]);

  const handleAddReview = async () => {
    if (newReview.trim() && newReviewer.trim() && newRating >= 1 && newRating <= 5) {
      const review = {
        breweryId: brewery.id,
        reviewer: newReviewer,
        rating: newRating,
        description: newReview,
      };
      try {
        const response = await fetch(`${url_24}/reviewdetails`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(review),
        });
        const data = await response.json();
        setReviews([...reviews, review]);
        setNewReview('');
        setNewReviewer('');
        setNewRating('');
        alert(data.message);
      } catch (error) {
        console.error('Error adding review:', error);
      }
    } else {
      alert('Please fill in all fields and provide a rating between 1 and 5.');
    }
  };

  const handleRatingChange = (e) => {
    const value = Number(e.target.value);
    if (value >= 1 && value <= 5) {
      setNewRating(value);
    } else {
      setNewRating('');
    }
  };

  return (
    <div className="brewery-details">
      <h1>Brewery Shop Details</h1>
      <div className='detailscontainerbrewery'>
        <div className="brewery-info">
          <h2>{brewery.name}</h2>
          <p><strong>Phone:</strong> {brewery.phone}</p>
          <p><strong>Country:</strong> {brewery.country}</p>
          <p><strong>Address:</strong> {brewery.address_1}</p>
          <p><strong>Status:</strong> {brewery.brewery_type}</p>
          <p><strong>Website:</strong> <a href={brewery.website_url} target="_blank" rel="noopener noreferrer">{brewery.website_url}</a></p>
          <div className="add-review">
            <h3>Add Your Review</h3>
            <input
              type="text"
              placeholder="Your Name"
              value={newReviewer}
              onChange={(e) => setNewReviewer(e.target.value)}
            />
            <input
              type="number"
              placeholder="Rating (1-5)"
              value={newRating}
              onChange={handleRatingChange}
              max="5"
              min="1"
            />
            <textarea
              placeholder="Your Review"
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
            />
            <button onClick={handleAddReview}>Add Review</button>
          </div>
        </div>
        <div className="brewery-image">
          <img className='Detailsimage' src="https://rabinsphotography.com/_next/image?url=%2Fresource-nav-bg.png&w=640&q=75" alt={brewery.name} />
        </div>
      </div>
      <div className="recent-reviews">
        <div>
          <h3>Recent Reviews</h3>
          <p>Total Reviews: {reviews.length}</p>
        </div>
        <div className='reviewscontainerdetails'>
          {reviews.map((review, index) => (
            <div key={index} className="review">
              <p><strong>{review.reviewer}</strong></p>
              <p>Rating: {'⭐'.repeat(review.rating)}</p>
              <p>{review.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BreweryDetails;
