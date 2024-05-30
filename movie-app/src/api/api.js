const API_BASE_URL = 'https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas';

// Get all movies by the genre
export const fetchMoviesByGenre = async (genre) => {
  const response = await fetch(`${API_BASE_URL}?form=json&byTags=genre:${genre}&byProgramType=movie`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  const movies = data.entries.map(entry => {
    console.log(`Entry for ${genre}:`, entry); // Log each entry
    const coverUrl = entry['plprogram$thumbnails']?.['orig-460x320']?.['plprogram$url'] || 'https://via.placeholder.com/150';
    
    // Log whether the cover URL was found or a placeholder is being used
    if (coverUrl === 'https://via.placeholder.com/150') {
      console.log(`Using placeholder for entry ID ${entry.id}`);
    } else {
      console.log(`Found cover URL for entry ID ${entry.id}: ${coverUrl}`);
    }
    return {
      id: entry.id,
      title: entry.title,
      cover: coverUrl
    };
  });
  return {
    count: movies.length,
    movies: movies,
  };
};