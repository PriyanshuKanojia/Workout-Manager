const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    weight: {
        type: Number
    },
    reps: {
        type: Number,
        required: true
    },
    sets: {
        type: Number
    },
    targetMuscle: {
        type: String
    },
    user_id: {
        type: String,
        required: true
    }
}, {timestamps: true} );

const Workout = mongoose.model('workout',workoutSchema);

module.exports = Workout;