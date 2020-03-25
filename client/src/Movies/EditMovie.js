import React, { useState, useEffect } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import axios from 'axios';

function EditMovie(){
    const [ newValue, setNewValue ] = useState({})
    const match = useRouteMatch();
    const history = useHistory();

    useEffect(() => {
        const id = match.params.id;
        axios.get(`http://localhost:5000/api/movies/${id}`)
        .then(res => {
            console.log(res.data);
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
        newValue.metascore = newValue.metascore * 1;
        console.log(newValue);
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
                    
                />
                <input type='submit' value='Submit Changes' className='edit-submit'/>
            </form>
            )}
        </div>
    );
}

export default EditMovie;