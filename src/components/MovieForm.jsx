import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie';

import {API} from '../api-service';

const MovieForm = ({movie, updateMovie, newMovieCreated}) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [token] = useCookies(["mr-token"]);

    useEffect(() => {
        setTitle(movie.title)
        setDescription(movie.description)
    }, [movie])


    const updateClicked = () => {
        API.updateMovie(movie.id, {title, description}, token["mr-token"])
        .then( resp => updateMovie(resp) )
        .catch( error => console.log(error))
    }

    const createClicked = () => {
        API.createMovie({title, description}, token["mr-token"])
        .then( resp => newMovieCreated(resp) )
        .catch( error => console.log(error))
    }

    const isDisabled = title.length === 0 || description.length === 0;

    return (
        <>
        { movie ? (
        <div>
            <label htmlFor='title'>Title</label><br />
            <input
                id='title'
                type="text"
                placeholder='title'
                value={title}
                onChange={ evt => setTitle(evt.target.value)}
            /><br />

            <label htmlFor='description'>Description</label><br />
            <textarea
                id='description'
                type="text"
                placeholder='description'
                value={description}
                onChange={ evt => setDescription(evt.target.value)}
            ></textarea><br />
            { movie.id ?
                <button
                    onClick={ updateClicked }
                    disabled={isDisabled}
                >
                    Update
                </button> :
                <button
                    onClick={ createClicked }
                    disabled={isDisabled}
                >
                    Create
                </button>
            }

        </div>
            ): null }
        </>
    )
}

export default MovieForm