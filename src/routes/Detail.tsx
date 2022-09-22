import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { MovieInfo } from './Home';

function Detail() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState<MovieInfo>({
    id: 1,
    title: '1',
    summary: 'a',
    genres: ['1'],
    medium_cover_image: 'a',
  });
  const getMovie = async () => {
    const response = await axios.get(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`);
    console.log(response);
    setMovie(response.data.data.movie);
    setIsLoading((bool) => !bool);
  };
  useEffect(() => {
    getMovie();
  }, []);
  return (
    <div>
      <h1>Detail</h1>
      {isLoading ? <h5>Loading...</h5> : <p>{movie.title}</p>}
    </div>
  );
}

export default Detail;
