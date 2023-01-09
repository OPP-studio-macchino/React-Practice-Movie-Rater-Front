import React, { useState } from 'react'
import { useCookies } from 'react-cookie';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'


const MovieDetails = ({movie, updateMovie}) => {

    const [highLighted, setHighLighted] = useState(-1);
    const [token] = useCookies(["mr-token"]);


    let mov = movie;

    const highlightRate = high => evt => {
        setHighLighted(high)
    }

    const rateClicked = rate => evt => {
        fetch(`http://127.0.0.1:8000/api/movies/${mov.id}/rate_movie/`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Token ${token["mr-token"]}`
            },
            body: JSON.stringify( {stars: rate + 1} )
        })
        .then( () => getDetails() )
        .catch( error => console.log(error) )
    }

    const getDetails = () => {
        fetch(`http://127.0.0.1:8000/api/movies/${mov.id}/`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Token ${token["mr-token"]}`
            }
        })
        .then( resp => resp.json() )
        .then( resp => updateMovie(resp) )
        .catch( error => console.log(error) )
    }

    return (
        <>
            { movie ? (
            <div>
                <h1>
                    {mov.title}
                </h1>
                <p>
                    {mov.description}
                </p>
                <FontAwesomeIcon icon={faStar}
                    className={mov.avg_rating > 0 ? 'orange' : ''}
                />
                <FontAwesomeIcon icon={faStar}
                    className={mov.avg_rating > 1 ? 'orange' : ''}
                />
                <FontAwesomeIcon icon={faStar}
                    className={mov.avg_rating > 2 ? 'orange' : ''}
                />
                <FontAwesomeIcon icon={faStar}
                    className={mov.avg_rating > 3 ? 'orange' : ''}
                />
                <FontAwesomeIcon icon={faStar}
                    className={mov.avg_rating > 4 ? 'orange' : ''}
                />
                ({mov.no_of_ratings})
                <div className='rate-container'>
                    <h2>Rate it</h2>
                    {[...Array(5)].map( (e, i) => {
                        return <FontAwesomeIcon key={i} icon={faStar}
                                    className={highLighted > i - 1 ? 'purple' : ''}
                                    onMouseEnter={highlightRate(i)}
                                    onMouseLeave={highlightRate(-1)}
                                    onClick={rateClicked(i)}
                                />
                    })
                    }
                </div>
            </div>
            ) : null}
        </>
    )
}

export default MovieDetails