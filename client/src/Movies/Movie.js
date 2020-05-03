import React, { useEffect, useState } from "react";
import { Route, Link, useHistory } from 'react-router-dom'
import axios from "axios";
import { useParams } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const history = useHistory()

  const deleteMovie = (id) => {
    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then(res => console.log(res))
      .then(() => history.push('/'))
      .catch(err => console.error(err))
  }

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">

      <MovieCard movie={movie} />

        <div className='edit-button' onClick={() => {
          {console.log(params.id)}
          (history.push(`/update-movie/${params.id}`))
        }}>
          Edit
        </div>

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>

      <div className='delete-button' onClick={deleteMovie}>
        Delete
      </div>
    </div>
  );
}

export default Movie;
