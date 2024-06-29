import React from 'react';
import { useLocation } from 'react-router-dom';
import BreweryDetails from './BreweryDetails';

const BreweryDetailsPage = () => {
  const location = useLocation();
  const { id, name, phone, address, website } = location.state;

  const brewery = {
    id,
    name,
    phone,
    address_1: address,
    website_url: website,
    brewery_type: 'micro', // You can adjust this as needed
    country: 'United States', // You can adjust this as needed
  };

  return <BreweryDetails brewery={brewery} />;
};

export default BreweryDetailsPage;
