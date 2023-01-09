import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useCookies } from 'react-cookie';

import { API } from '../api-service';

const MovieList = ({movies, movieClicked, editClicked, removeClick}) => {

    const [token] = useCookies(["mr-token"]);

    const movieClick = movie => evt => {
        movieClicked(movie)
    }

    const editClick = movie => {
        editClicked(movie)
    }
    const removeClicked = movie => {
        API.deleteMovie(movie.id, token["mr-token"])
            .then(() => removeClick(movie))
            .catch(error=> console.log())
    }

    return (
        <div>
        { movies.map( movie => {
            return (
                <div key={movie.id} className='movie-item'>
                    <h2
                        onClick={movieClick(movie)}
                    >
                        { movie.title }
                    </h2>
                    <FontAwesomeIcon icon={faEdit} onClick={() => editClick(movie)}/>
                    <FontAwesomeIcon icon={faTrash} onClick={() => removeClicked(movie)}/>
                </div>
            )
        } ) }
        </div>
    )
}

export default MovieList