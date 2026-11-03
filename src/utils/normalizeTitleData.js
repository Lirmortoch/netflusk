const toYear = date => date ? new Date(date).getFullYear() : null;
const toRating = rating => rating ? Number.parseFloat(rating).toFixed(1) : null;

export const normalizeMovie = movie => ({
  id: movie.id,
  name: movie.title,
  date: toYear(movie.release_date),
  rating: toRating(movie.vote_average),
  poster_path: movie.poster_path,
});
export const normalizeShow = show => ({
  id: show.id,
  name: show.name,
  date: toYear(show.first_air_date),
  rating: toRating(show.vote_average),
  poster_path: show.poster_path,
});