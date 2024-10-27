import { useState, useEffect } from "react";
import GitHubProfiles from "./GitHubProfiles"; // Import the GitHubProfiles component
import Login from "./login";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Manage authentication state
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchInput, setSearchInput] = useState(""); // Keep the input state here
  const [searchType, setSearchType] = useState("location"); // Set 'location' as default search type

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsAuthenticated(true); // Auto-authenticate if the token is found
    }
  }, []);

  // Toggle dark mode class on the body element
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  const handleLogin = (token) => {
    localStorage.setItem("accessToken", token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/" />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />

          <Route
            path="/"
            element={
              isAuthenticated ? (
                <>
                  <div>
                    <button onClick={handleLogout} className="logout-button">
                      Logout
                    </button>
                    <h1
                      className="title dark-mode-toggle"
                      onClick={() => setIsDarkMode(!isDarkMode)}
                    >
                      GitHub Finder
                    </h1>
                  </div>
                  <div className="sticky-container">
                    {/* Search input field */}
                    <input
                      type="text"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)} // Manage the search input
                      placeholder={`Search GitHub profiles by ${searchType}`} // Dynamically update placeholder
                    />

                    <select
                      value={searchType}
                      onChange={(e) => setSearchType(e.target.value)}
                    >
                      <option value="location">Location</option>
                      <option value="username">Username</option>
                      <option value="fullname">Name</option>
                    </select>
                  </div>
                  <GitHubProfiles
                    searchInput={searchInput}
                    searchType={searchType}
                  />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
