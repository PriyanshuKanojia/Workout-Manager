const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.statics.login = async function(email,password) {
    if(!email || !password){
        throw Error('Please fill out all the fields!'); 
    }

    const user = await this.findOne({email});
    if(!user){
        throw Error('User does not exist!');
    }
    const match = await bcrypt.compare(password, user.password);
    if(!match){
        throw Error('Incorrect password');
    }

    return user;
}

userSchema.statics.signup = async function(email, password) {

    if(!email || !password){
        throw Error('Please fill out all the fields!'); 
    }
    if(!validator.isEmail(email)){
        throw Error('Invalid Email!');
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Password not strong enough!');
    }

    const exists = await this.findOne({email});
    if(exists){
        throw Error('Email already in use!');
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await this.create({email, password: hash});

    return user;
}

const User = mongoose.model('User', userSchema);

module.exports = User;