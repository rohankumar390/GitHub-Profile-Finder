import { useState, useEffect } from "react";
import axios from "axios";

const GitHubProfiles = ({ searchInput, searchType }) => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchInput) {
        fetchProfiles(searchInput, searchType);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchInput, searchType]);

  const fetchProfiles = async (query, type) => {
    setLoading(true);
    setError("");

    let queryParam = "";
    if (type === "location") {
      queryParam = `location:${query}`;
    } else if (type === "username") {
      queryParam = `${query} in:login`;
    } else if (type === "fullname") {
      queryParam = `${query} in:name`;
    }

    try {
      const response = await axios.get(
        `https://api.github.com/search/users?q=${queryParam}`
      );
      setProfiles(response.data.items);
    } catch (err) {
      setError("Error fetching data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {profiles.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Username</th>
              <th>GitHub Profile</th>
            </tr>
          </thead>
          <tbody>
            {profiles.map((profile) => (
              <tr key={profile.id}>
                <td>
                  <img
                    src={profile.avatar_url}
                    alt={profile.login}
                    width="50"
                    height="50"
                  />
                </td>
                <td>{profile.login}</td>
                <td>
                  <a
                    href={profile.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Profile
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default GitHubProfiles;
