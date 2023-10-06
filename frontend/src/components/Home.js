import React, { useEffect, useState, useMemo} from 'react';
import WorkoutList from './WorkoutList';
import AddWorkout from './AddWorkout';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext';

export default function Home() {

    const { workouts, dispatch } = useWorkoutsContext();
    const {user} = useAuthContext();
    const [all, setAll] = useState(true);
    const [chest, setChest] = useState(false);
    const [biceps, setBiceps] = useState(false);
    const [legs, setLegs] = useState(false);
    const [shoulders, setShoulders] = useState(false);
    const [triceps, setTriceps] = useState(false);
    const [back, setBack] = useState(false);
    var muscles = useMemo(() => ['all'],[]);

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts/', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json();
            var obj = json;
            if(!muscles.includes('all')){
                obj = json.filter((w) => muscles.includes(w.targetMuscle));
            }
            if (response.ok) {
                dispatch({ type: 'GET_WORKOUTS', payload: obj });
            }
        }
        if(user){
            fetchWorkouts();
        }
    }, [dispatch, user, muscles,all, chest, biceps, legs, shoulders, triceps, back]);

    return (
        <div className="home">
            <div className="tags">
                <li>
                    <input type="checkbox" id="all" defaultChecked onChange={(e) => {
                        setAll(!all);
                        const index = muscles.indexOf('all');
                        if(index>-1){
                            muscles.splice(index, 1);
                        }
                        else{
                            muscles.push('all');
                        }
                    }} />
                    <label htmlFor="all" className='all'>All</label>
                </li>
                <li>
                    <input type="checkbox" id="chest" onChange={() => {
                        setChest(!chest);
                        const index = muscles.indexOf('chest');
                        if(index>-1){
                            muscles.splice(index, 1);
                        }
                        else{
                            muscles.push('chest');
                        }
                    }} />
                    <label htmlFor="chest">Chest</label>
                </li>
                <li>
                    <input type="checkbox" id="Biceps" onChange={() => {
                        setBiceps(!biceps);
                        const index = muscles.indexOf('biceps');
                        if(index>-1){
                            muscles.splice(index, 1);
                        }
                        else{
                            muscles.push('biceps');
                        }
                    }} />
                    <label htmlFor="Biceps">Biceps</label>
                </li>
                <li>
                    <input type="checkbox" id="Legs" onChange={() => {
                        setLegs(!legs);
                        const index = muscles.indexOf('legs');
                        if(index>-1){
                            muscles.splice(index, 1);
                        }
                        else{
                            muscles.push('legs');
                        }
                    }} />
                    <label htmlFor="Legs">Legs</label>
                </li>
                <li>
                    <input type="checkbox" id="Shoulders" onChange={() => {
                        setShoulders(!shoulders);
                        const index = muscles.indexOf('shoulders');
                        if(index>-1){
                            muscles.splice(index, 1);
                        }
                        else{
                            muscles.push('shoulders');
                        }
                    }} />
                    <label htmlFor="Shoulders">Shoulders</label>
                </li>
                <li>
                    <input type="checkbox" id="Triceps" onChange={() => {
                        setTriceps(!triceps);
                        const index = muscles.indexOf('triceps');
                        if(index>-1){
                            muscles.splice(index, 1);
                        }
                        else{
                            muscles.push('triceps');
                        }
                    }} />
                    <label htmlFor="Triceps">Triceps</label>
                </li>
                <li>
                    <input type="checkbox" id="Back" onChange={() => {
                        setBack(!back);
                        const index = muscles.indexOf('back');
                        if(index>-1){
                            muscles.splice(index, 1);
                        }
                        else{
                            muscles.push('back');
                        }
                    }} />
                    <label htmlFor="Back">Back</label>
                </li>
            </div>
            <div className="content">
                <div className="workoutlist">
                    {workouts && <WorkoutList workouts={workouts} />}
                </div>
                <div className="addworkout">
                    <AddWorkout />
                </div>
            </div>
        </div>
    )
}