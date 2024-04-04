const { hash, compare  } = require('bcryptjs');
const User = require('../models/user');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const saltRounds = 10;


/**
 * Registers a new user with the provided email, password, first name, and last name.
 *
 * @param email The email address of the user to register.
 * @param password The password of the user to register.
 * @param firstName The first name of the user to register.
 * @param lastName The last name of the user to register.
 * @throws Error If the provided email is not a valid email address or if a user with the provided email already exists.
 */
const register = async (email, password, firstName, lastName) => {
    if(!validator.isEmail(email)) throw new Error('Email is not a valid email')
    const user = await User.findOne({ where: {email: email}});
    if(user) throw new Error('User already exists');
    const hashPass = await hash(password, saltRounds);
    await User.create({email: email, password: hashPass, firstName: firstName, lastName: lastName, role: 1});
};


/**
 * Logs in a user with the provided email and password.
 *
 * @param email The email address of the user trying to log in.
 * @param password The password of the user trying to log in.
 * @return String representing the JWT token for user authentication.
 * @throws Error If the provided credentials are incorrect.
 */
const login = async (email, password) => {
    const user = await User.findOne({ where: {email: email}});
    if(!user) throw new Error('Incorrect credentials');
    const passwordMatch = await compare(password, user.password);
    if(!passwordMatch) throw new Error('Incorrect credentials');
    const token = jwt.sign({ user: user }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
};


/**
 * Generates a new JWT token if the provided token is expired; otherwise, returns the old token.
 * @param {string} oldToken - The old JWT token to be refreshed.
 * @returns {string} Returns a new JWT token if the old token is expired; otherwise, returns the old token.
 */
const refreshToken = (oldToken) => {
    // Decode the old token to get payload
    const decoded = jwt.decode(oldToken);

    // Check if the token is expired
    if (decoded.exp < Date.now() / 1000) {
        // Token is expired, generate a new token
        const newToken = jwt.sign({ user: decoded.user }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return newToken;
    } else {
        // Token is still valid, return the old token
        return oldToken;
    }
}


/**
 * Middleware to verify JWT token for authentication.
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @param {import('express').NextFunction} next - Express next function.
 */
const authMiddleware = (req, res, next) => {
    // check for cookie
    const token = req.cookies.auth
    if(!token) {
        return res.status(401).json({
            status: 401,
            message: 'No token, no access -- Please Login'
        });
    }
    const refreshedToken = refreshToken(token)
    const claims = jwt.verify(refreshedToken, process.env.JWT_SECRET);
    if(!claims) {
        return res.status(401).json({
            status: 401,
            message: 'Invalid token -- Please Login'
        });
    } else {
        next()
    }
};



module.exports = {
    register,
    login,
    authMiddleware
}