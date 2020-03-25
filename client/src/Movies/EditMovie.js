import React, { useState, useEffect } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import axios from 'axios';

function EditMovie({ handleEditCount }){
    const [ newValue, setNewValue ] = useState(null)
    const match = useRouteMatch();
    const history = useHistory();

    useEffect(() => {
        const id = match.params.id;
        axios.get(`http://localhost:5000/api/movies/${id}`)
        .then(res => {
            res.data = {
                ...res.data,
                stars: res.data.stars.toString()
            }
            setNewValue(res.data)
        })
        .catch(err => {
            console.log(err);
        })
    }, [match.params.id]);

    const goBack = () => {
        const id = match.params.id;
        history.push(`/movies/${id}`);
    }

    const handleChange = e => {
        setNewValue({
            ...newValue,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();

        // Re-format object
        newValue.metascore = newValue.metascore * 1;
        newValue.stars = newValue.stars.split(',');

        const id = match.params.id;
        axios.put(`http://localhost:5000/api/movies/${id}`, newValue)
        .then(res => {
            console.log(res);
            handleEditCount();
        })
        .catch(err => {
            console.log(err);
        })
        history.push(`/movies/${id}`);
    }

    return(
        <div className='edit-wrapper'>
            <div className='back-button' onClick={goBack}>Go Back</div>
            {newValue && (
                <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input
                    name='title'
                    value={newValue.title}
                    onChange={handleChange}
                />
                <label>Director</label>
                <input
                    name='director'
                    value={newValue.director}
                    onChange={handleChange}
                />
                <label>Metascore</label>
                <input
                    name='metascore'
                    value={newValue.metascore}
                    onChange={handleChange}
                />
                <label>Stars</label>
                <input
                    name='stars'
                    value={newValue.stars}
                    onChange={handleChange}
                />
                <input type='submit' value='Submit Changes' className='edit-submit'/>
            </form>
            )}
        </div>
    );
}

export default EditMovie;