const Workout = require('../models/Workout');

module.exports.workoutGet = async (req, res) => {
    const user_id = req.user._id;

    try{
        const workouts = await Workout.find({user_id}).sort({createdAt: -1});
        res.status(200).json(workouts);
    }
    catch (err) {
        res.status(400).json({error: err.message});
    }
}

module.exports.workoutPost = async (req, res) => {
    const user_id = req.user._id;
    const {name,weight,reps,sets, targetMuscle} = req.body;
    try{
        const workout = await Workout.create({name,weight,reps,sets, targetMuscle, user_id});
        res.status(200).json(workout);
    }
    catch (err) {
        res.status(400).json({error: err.message});
        console.log(err);
    }
}

module.exports.workoutGetone = async (req, res) => {
    const {id} = req.params;
    try{
        const workout = await Workout.findById(id);
        if(!workout){
            return res.status(404).json({error: "No such workout found"});
        }
        res.status(200).json(workout);
    }
    catch (err) {
        res.status(400).json({error: err.message});
    }
}

module.exports.delete = async (req, res) => {
    const {id} = req.params;
    try{
        const workout = await Workout.findOneAndDelete({_id: id});
        res.status(200).json(workout);
    }
    catch (err) {
        res.status(400).json({error: err.message});
    }
}

module.exports.update = async (req, res) => {
    const {id} = req.params;
    try{
        const workout = await Workout.findOneAndUpdate({_id: id}, {
            ...req.body
        });
        if(!workout){
            return res.status(404).json({error: "No such workout found"});
        }
        res.status(200).json(workout);
    }
    catch (err) {
        res.status(400).json({error: err.message});
    }
}