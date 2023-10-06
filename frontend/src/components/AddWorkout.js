import React, { useState } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext';

export default function AddWorkout() {

  const {dispatch}  = useWorkoutsContext();
  const {user} = useAuthContext();

  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [sets, setSets] = useState('');
  const [targetMuscle, setTargetMuscle] = useState('chest');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!user){
      setError('You are not logged in');
      return;
    }

    const workout = {name, weight, reps, sets, targetMuscle};
    
    const response = await fetch('/api/workouts', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify(workout)
    });

    const json = await response.json();

    if(!response.ok){
      console.log(json);
      setError(json.error);
    }
    else if(response.ok){
      setName('');
      setWeight('');
      setReps('');
      setSets('');
      setError(null);
      dispatch({type: 'CREATE_WORKOUT', payload: json});
    }

  }

  return (
    <div className="addWorkoutForm">
      <h1>Add Workout</h1>
      <form>
        <label htmlFor="name">Exercise Name: </label>
        <input type="text" name="name" required onChange={(e) => {setName(e.target.value)}} value={name} />
        <label htmlFor="weight">Weight(in kg): </label>
        <input type="number" name="weight" onChange={(e) => {setWeight(e.target.value)}} value={weight} />
        <label htmlFor="reps">Reps: </label>
        <input type="number" name="reps" required onChange={(e) => {setReps(e.target.value)}} value={reps} />
        <label htmlFor="sets">Sets: </label>
        <input type="number" name="sets" onChange={(e) => {setSets(e.target.value)}} value={sets} />
        <label htmlFor="targetMuscle">Target Muscle: </label>
        <select name="targetMuscle" onChange={(e) => {
          setTargetMuscle(e.target.value);
          console.log(targetMuscle);
          }} >
          <option value="chest">Chest</option>
          <option value="biceps">Biceps</option>
          <option value="legs">Legs</option>
          <option value="shoulders">Shoulders</option>
          <option value="triceps">Triceps</option>
          <option value="back">Back</option>
        </select>
        <button onClick={handleSubmit}>Submit</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  )
}
