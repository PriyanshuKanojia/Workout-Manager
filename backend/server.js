require('dotenv').config();

const express = require('express');
const workoutRoutes = require('./routes/workoutRoutes');
const userRoutes = require('./routes/userRoutes');
const mongoose = require('mongoose');

const app = express();

// database connection
mongoose.connect(process.env.dbURI)
.then( () => {
    app.listen(process.env.PORT, () => {
        console.log('Listening to port' , process.env.PORT );
    });
} )
.catch( (err) => console.log(err));

// Middleware
app.use((req,res,next) => {
    console.log(req.path, req.method);
    next();
});

app.use(express.json());
app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);

app.get('/', (req, res) => {
    res.json({mssg: "Welcome to the app!"});
});