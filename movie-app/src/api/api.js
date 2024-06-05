const API_BASE_URL = 'https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas';

// Function to fetch data from the API
const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
};

// Get all movies by the genre and return the count and the movies with the cover and title
export const fetchMoviesByGenre = async (genre) => {
  const data = await fetchData(`${API_BASE_URL}?form=json&byTags=genre:${genre}&byProgramType=movie`);
  const movies = mapData(data);
  return {
    count: movies.length,
    movies: movies,
  }
}

// Function to fetch the thumbnail
const fetchThumbnail = (entry) => {
  const coverUrl = entry['plprogram$thumbnails']?.['orig-460x320']?.['plprogram$url'] || 'https://via.placeholder.com/150';
  return coverUrl;
};

// Function to map the data to the desired format
const mapData = (data) => {
  return data.entries.map(entry => {
    const coverUrl = fetchThumbnail(entry);
    return {
      cover: coverUrl,
      title: entry.title,
    };
  });
};

