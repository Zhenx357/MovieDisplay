export const genres = [
    { name: 'Action', count: 10, movies: [] },
    { name: 'Comedy', count: 8, movies: [] },
    { name: 'Thriller', count: 7, movies: [] },
    { name: 'War', count: 5, movies: [] },
    { name: 'Romance', count: 6, movies: [] },
    { name: 'Drama', count: 12, movies: [] },
    { name: 'Crime', count: 4, movies: [] },
    { name: 'Documentary', count: 9, movies: [] },
    { name: 'Horror', count: 11, movies: [] },
  ];
  
  // Populate movies with dummy data
  genres.forEach(genre => {
    for (let i = 1; i <= genre.count; i++) {
      genre.movies.push({
        id: `${genre.name.toLowerCase()}-${i}`,
        title: `${genre.name} Movie ${i}`,
        cover: 'https://via.placeholder.com/150', // Placeholder image
      });
    }
  });