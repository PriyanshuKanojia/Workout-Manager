const express = require('express');
const workoutController = require('../controllers/workoutController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.use(requireAuth);

router.get('/', workoutController.workoutGet);

router.get('/:id', workoutController.workoutGetone);

router.post('/', workoutController.workoutPost);

router.delete('/:id', workoutController.delete);

router.patch('/:id', workoutController.update);


module.exports = router;