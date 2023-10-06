import React from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

export default function WorkoutList({workouts}) {

  const {dispatch} = useWorkoutsContext();
  const {user} = useAuthContext();

  const handleDelete = async (workout) => {
    if(!user){
      return;
    }

    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    });
    const json = await response.json();

    if(response.ok){
      dispatch({type:'DELETE_WORKOUT', payload: json});
    }
  }

  return (
    <div className="workout-list">
        {workouts.map((workout) => (
          <div className="workout-preview" key={workout._id}>
            <div className="title">
              <div className="h1">
                <h1> {workout.name} </h1>
              </div>
              <div className="span">
                <span onClick={() => handleDelete(workout)}>Delete</span>
              </div>
            </div>
            {workout.weight!=null && <h2>Weight(kg): {workout.weight}</h2>}
            <h2>Reps: {workout.reps}</h2>
            {workout.sets!=null && <h2>Sets: {workout.sets}</h2>}
            <h2>Target Muscle: {workout.targetMuscle}</h2>
            <p>Created {formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true})}</p>
          </div>
        ))}
    </div>
  )
}
