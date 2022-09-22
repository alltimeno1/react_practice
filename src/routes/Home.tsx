import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Movie from '../components/Movie';

export type MovieInfo = {
  id: number;
  title: string;
  summary: string;
  genres: string[];
  medium_cover_image: string;
};

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState<MovieInfo[]>([]);
  const getMovies = async () => {
    const response = await axios.get('https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year');
    setMovies(response?.data?.data?.movies);
    setIsLoading((bool) => !bool);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        movies.map(({ id, title, medium_cover_image, summary, genres }) => (
          <Movie key={id} id={id} title={title} image={medium_cover_image} summary={summary} genres={genres} />
        ))
      )}
    </div>
  );
}

export default Home;
