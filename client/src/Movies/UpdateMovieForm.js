import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const UpdateMovieForm = (id) => {
    console.log('id', id)
    const [movie, setMovie] = useState({
        id: id,
        title: '',
        director: '',
        metascore: 0,
        stars: []
    })

    const history = useHistory()

    const handleChange = e => {
        setMovie({
            ...movie,
            [ e.target.name ]: e.target.value
        });
    }

    const onSubmit = (e) => {
        e.preventDefault()
        axios
          .put(`http://localhost:5000/api/movies/${id}`, movie)
          .then(res => console.log(res))
          .then(() => history.push('/'))
          .catch((err) => console.log(err.response));
          setMovie({})
      };

    return (
        <>
            <h2 
                style={{marginBottom: '10px'}}>
                    Movie Editor
            </h2>
            <form onSubmit={onSubmit}>
                <label>Title: </label>
                <input 
                    type='text' 
                    name='title' 
                    onChange={e => handleChange(e)}
                />
                <label>Director: </label>
                <input 
                    type='text' 
                    name='director' 
                    onChange={e => handleChange(e)}
                />
                <label>Metascore: </label>
                <input 
                    type='text' 
                    name='metascore' 
                    onChange={e => handleChange(e)}
                />
                <label>Stars: </label>
                <input 
                    type='text' 
                    name='stars' 
                    onChange={e => handleChange(e)}
                />
                <button type='submit'>
                    Update Movie
                </button>
            </form>
        </>
    )
}

export default UpdateMovieForm;
