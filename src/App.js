import React, { useState } from 'react';
import './App.css';
import Login from './components/Login';
import UserProfile from './components/UserProfile';
import GenerateTokenButton from './components/GenerateTokenButton';
import AccountInsights from './components/AccountInsights';
import axios from 'axios';

function App() {
  const [accessToken, setAccessToken] = useState(null);
  const [longLivedToken, setLongLivedToken] = useState(null);
  const [isTokenExchangeLoading, setIsTokenExchangeLoading] = useState(false); // Add this state variable

  const handleLogin = (token) => {
    setAccessToken(token);
  };

  // Set up Axios instance with the base URL
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
  });

  const handleGenerateToken = async () => {
    if (accessToken) {
      setIsTokenExchangeLoading(true);

      try {
        // Make a POST request to the backend to exchange the short-lived token
        const response = await axiosInstance.post('/api/token-exchange', {
          shortLivedToken: accessToken,
          facebookId: window.sessionStorage.getItem("id")
        });

        if (response.data.message === 'Token stored successfully') {
          setLongLivedToken(response.data.longLivedToken);
        } else {
          console.error('Token exchange failed');
        }
      } catch (error) {
        console.error('Error exchanging token:', error);
      } finally {
        setIsTokenExchangeLoading(false); // Set loading to false after the request is complete (success or error)
      }
    }
  }

  return (
    <div className="App">
      <h1>Facebook Integration</h1>
      <Login onLogin={handleLogin} />
      <UserProfile accessToken={accessToken} />
      {accessToken && (
        <div>
          <GenerateTokenButton onGenerateToken={handleGenerateToken} />
          {isTokenExchangeLoading && <p>Exchanging token...</p>} {/* Loading indicator */}
        </div>
      )}
      {longLivedToken && <AccountInsights longLivedToken={longLivedToken} />}
    </div>
  );
}

export default App;
