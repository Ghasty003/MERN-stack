import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';
import AuthContext from '../context/AuthContext';
import WorkoutContext from '../context/WorkoutContext';

function Home() {

   const {workouts, dispatch} = useContext(WorkoutContext);
   const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchWorkout = async () => {
            const response = await fetch("http://localhost:4000/api/workouts", {
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            });
            const json = await response.json();
            if (response.ok) {
                dispatch({type: "SET_WORKOUTS", payload: json});
                console.log(json)
            }
        }

        if (user) {
            fetchWorkout();
        }
    }, [dispatch, user]);

    return (
        <div className='home'>
            <div className="workouts">
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout} />
                ))}
            </div>
            <WorkoutForm />
        </div>
    );
}

export default Home;