export { fetchMoviesByGenre, fetchMovieInfo, fetchCredits };

const API_BASE_URL = 'https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas';

// Function to fetch data from the API
const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
};

// seperate function to fetch the amount of movies by genre to reduce load time
const fetchGenreCount = async (genre) => {
  const data = await fetchData(`${API_BASE_URL}?form=json&byTags=genre:${genre}&byProgramType=movie&fields=title&range=1-10000`);
  return {
    count: data.entryCount
  }
}


// Get all movies by the genre and return the count and the movies with the cover and title
const fetchMoviesByGenre = async (genre, page = 1, pageSize = 12) => {
  const start = (page - 1) * pageSize + 1;
  const end = start + pageSize - 1;
  const data = await fetchData(`${API_BASE_URL}?form=json&byTags=genre:${genre}&byProgramType=movie&range=${start}-${end}`);
  const movies = mapData(data);
  const genreAmount = await fetchGenreCount(genre);
  return {
    count: genreAmount.count,
    movies: movies, // containing the cover and title and id
  }
}

// Function to fetch the thumbnail
const fetchThumbnail = (entry) => {
  const coverUrl = entry['plprogram$thumbnails']?.['orig-460x320']?.['plprogram$url'] || 'https://via.placeholder.com/320x460';
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

// function to fetch actor and director, because fetchMovieInfo api returns blank when fetching actors and directors
const fetchCredits = async (id) => {
  const data = await fetchData(`${API_BASE_URL}/${id}?form=json`);
  const directors = data.plprogram$credits.filter(credit => credit.plprogram$creditType === 'director');
  const actors = data.plprogram$credits.filter(credit => credit.plprogram$creditType === 'actor');
  return{
    directors: directors.map(director => director.plprogram$personName),
    actors: actors.map(actor => actor.plprogram$personName),
  };
}


