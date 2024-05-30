const API_BASE_URL = 'https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas';

// Get all movies by the genre
export const fetchMoviesByGenre = async (genre) => {
  const response = await fetch(`${API_BASE_URL}?form=json&byTags=genre:${genre}&byProgramType=movie`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  const movies = data.entries || [];
  return {
    count: movies.length,
    movies: movies,
  };
};