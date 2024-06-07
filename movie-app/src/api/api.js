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
const fetchMoviesByGenre = async (genre) => {
  const data = await fetchData(`${API_BASE_URL}?form=json&byTags=genre:${genre}&byProgramType=movie`);
  const movies = mapData(data);
  return {
    count: movies.length,
    movies: movies, // containing the cover and title and id
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
    const id = entry.id.split('/').pop(); //extracts the id from the url example: data/ProgramAvailability/41644072040 -> 41644072040
    return { // array if movies with the cover, title and id
      cover: coverUrl,
      title: entry.title,
      id: id,
    };
  });
};

// function to fetch genres
const fetchGenres = (entry) => {
  const genres = entry['plprogram$tags'] // gets the tags
    .filter(tag => tag['plprogram$scheme'] === 'genre') // filters the tags that have the scheme genre
    .map(tag => tag['plprogram$title']); // maps the title of the tags to create an array of genres
  return genres.length > 0 ? genres : ['No Genre']; // if there are no genres it returns 'No Genre'
};

// fetching movieinfo
const fetchMovieInfo = async (id) => {  
  console.log("fetching movie info")
  const data = await fetchData(`${API_BASE_URL}/${id}?form=json&fields=title,description,year,thumbnails,programType,tags`);
  const coverUrl = fetchThumbnail(data);
  const genres = fetchGenres(data);
  return{
    title: data.title,
    description: data.description,
    releaseYear: data.plprogram$year,
    programType: data.plprogram$programType,
    cover:coverUrl,
    genres: genres,
  
  }
}

export { fetchMoviesByGenre, fetchMovieInfo };

