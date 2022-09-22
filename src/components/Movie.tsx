import { Link } from 'react-router-dom';

type MovieProps = {
  id: number;
  title: string;
  summary: string;
  genres: string[];
  image: string;
};

function Movie({ id, title, image, summary, genres }: MovieProps) {
  return (
    <div>
      <img src={image} alt="/" />
      <h2>
        <Link to={`/movie/${id}`}>{title}</Link>
      </h2>
      <p>{summary}</p>
      <ul>
        {genres.map((genre) => (
          <li key={genre}>{genre}</li>
        ))}
      </ul>
    </div>
  );
}

export default Movie;
