const jwt = require('jsonwebtoken');
const User = require('../models/User');

const maxAge = 3*24*60*60;

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: maxAge});
}

module.exports.login = async (req, res) => {
    const {email, password} = req.body;
    try{
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.status(200).json({email, token});
    }
    catch (err) {
        res.status(400).json({error: err.message});
    }
}

module.exports.signup = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.signup(email, password);
        const token = createToken(user._id);
        res.status(200).json({email, token});
    }
    catch (err) {
        res.status(400).json({error: err.message});
    }
}