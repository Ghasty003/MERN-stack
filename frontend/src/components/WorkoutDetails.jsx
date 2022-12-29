import React from 'react';
import { useContext } from 'react';
import WorkoutContext from '../context/WorkoutContext';
import formatDistanceToNow from "date-fns/formatDistanceToNow";

function WorkoutDetails({workout}) {

    const {dispatch} = useContext(WorkoutContext);

    const handleClick = async () => {
        const response = await fetch("http://localhost:4000/api/workouts/"+ workout._id, {
            method: "DELETE"
        });
        const json = await response.json();

        if (response.ok) {
            dispatch({type: "DELETE_WORKOUT", payload: json})
        }
    }

    return (
        <div className='workout-details'>
            <h4>{workout.title}</h4>
            <p><strong>Load (kg): {workout.load} </strong></p>
            <p><strong>Reps (kg): {workout.reps} </strong></p>
            <p> {formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true})} </p>
            <span onClick={handleClick}>delete</span>
        </div>
    );
}

export default WorkoutDetails;