import { useState, useEffect } from "react";
import "./App.css";
import GitHubProfiles from "./GitHubProfiles"; // Import the GitHubProfiles component

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchInput, setSearchInput] = useState(""); // Keep the input state here
  const [searchType, setSearchType] = useState("location"); // Set 'location' as default search type

  // Toggle dark mode class on the body element
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  return (
    <div className="container">
      <h1
        className="title dark-mode-toggle"
        onClick={() => setIsDarkMode(!isDarkMode)}
      >
        GitHub Finder
      </h1>

      {/* Sticky Input Field */}
      <div className="sticky-container">
        {/* Dropdown for selecting search type */}
        

        {/* Search input field */}
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)} // Manage the search input
          placeholder={`Search GitHub profiles by ${searchType}`} // Dynamically update placeholder
        />

<select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)} // Update search type
        >
          <option value="location">Location</option>
          <option value="username">Username</option>
          <option value="fullname">Name</option>
          {/* Add other options as needed */}
        </select>
      </div>

      {/* Pass searchInput and searchType to GitHubProfiles */}
      <GitHubProfiles searchInput={searchInput} searchType={searchType} />
    </div>
  );
}

export default App;
