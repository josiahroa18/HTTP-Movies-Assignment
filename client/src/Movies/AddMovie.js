import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function AddMovie({ increaseMovieCount }){
    const [ value, setValue ] = useState({
        title: '',
        director: '',
        metascore: '',
        stars: ''
    })
    const history = useHistory();

    const goBack = () => {
        history.push('/');
    }

    const handleChange = e => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();

        // Re-format object
        value.metascore = value.metascore * 1;
        value.stars = value.stars.split(',');

        axios.post('http://localhost:5000/api/movies', value)
        .then(() => {
            increaseMovieCount();
            history.push('/');
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <div className='form-wrapper'>
            <div className='back-button' onClick={goBack}>Go Back</div>
            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input
                    name='title'
                    onChange={handleChange}
                />
                <label>Director</label>
                <input
                    name='director'
                    onChange={handleChange}
                />
                <label>Metascore</label>
                <input
                    name='metascore'
                    onChange={handleChange}
                />
                <label>Stars</label>
                <input
                    name='stars'
                    onChange={handleChange}
                />
                <input type='submit' value='Add Movie' className='form-submit'/>
                </form>
        </div>
    );
}

export default AddMovie;