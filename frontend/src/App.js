import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Cookies from "js-cookie";
import './App.css';
import NavBar from './components/navbar/index';
import Registration from './components/registration';
import LoginForm from './components/signup';
import NavBar1 from './navbar1';
import HomePage from './components/Home';
import ProtectedRoute from './components/ProtectedRoute';
import SearchResults from './components/searchResults';
import BreweryDetailsPage from './components/BreweryDetailsPage';

function App() {
  const [jwtToken, setJwtToken] = useState(Cookies.get("jwtToken"));

  useEffect(() => {
    const token = Cookies.get("jwtToken");
    setJwtToken(token);
  }, []);

  const handleTokenChange = (newToken) => {
    setJwtToken(newToken);
  };

  return (
    <div className="App">
      {jwtToken !== undefined ? <NavBar1 onTokenChange={handleTokenChange} /> : <NavBar onTokenChange={handleTokenChange} />}
      <Routes>
        <Route path="/" element={<LoginForm onTokenChange={handleTokenChange} />} />
        <Route path="/register" element={<Registration onTokenChange={handleTokenChange} />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/searchresults"
          element={

            <SearchResults />

          }
        />
        <Route path="/details/:id" element={<BreweryDetailsPage />} />
      </Routes>
    </div>
  );
}

export default App;
