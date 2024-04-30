const { register, login, authMiddleware, updateUserCard } = require('../controllers/authController');
const Router = require('express').Router;
const protectedRouter = Router();
const authRouter = Router();
const User = require('../models/user');
const { createCustomer, createCard_setupIntent_create, retrieveSetupIntent, updateCustomerPaymentMethod } = require('../controllers/stripeController');
const {where} = require("sequelize");






protectedRouter.use(authMiddleware);
authRouter.use('/account', protectedRouter);


protectedRouter.get('/dashboard',async (req, res) => {
    try {
        const user = await User.findOne({where: {id: req.user.id}});
        res.status(200).json({
            status: 200,
            user: {
                email: user.email,
                id: user.id,
                card: user.card,
                stripeId: user.stripeId,
            }
        });
    } catch(error) {
        return res.status(500).json({
            status: 500,
            message: error.message
        });
    }
});

protectedRouter.post('/createcard_request', async (req, res) => {
    try {
        const customerId = req.user.stripeId;
        const clientSecret = await createCard_setupIntent_create(customerId);

        res.status(200).json({ clientSecret: clientSecret });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while setting up the intent.' });
    }
});

protectedRouter.post('/createcard_confirm', async (req, res) => {
    try {
        // check si if success
        const si = await retrieveSetupIntent(req.body.siId);
        const status = 'succeeded';
        if(status.localeCompare(si.status)) throw Error('Setup Intent Failed');

        await updateCustomerPaymentMethod(req.user.stripeId, si.payment_method);

        const user = await updateUserCard(true, req.user.email);
        if(!user) throw Error('Update User Failed');

        res.status(200).json({ success: true });
    } catch(error) {
        res.status(500).json({
            error: error.message
        });
    }
});





/**
 * Handles the POST request to register a new user.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {Object} The HTTP response object with status and message indicating the result of the registration operation.
 */
authRouter.post('/register', async (req, res) => {
    try {
        // register new user
        await register(req.body.email, req.body.password, req.body.firstName, req.body.lastName);

        // create stripe customer
        await createCustomer(req.body.email, req.body.firstName + ' ' + req.body.lastName)

        return res.status(201).json({
            status: 201,
            message: 'User successfully created!'
        });
    } catch (error) {
        if(error.message === 'Validation error') {
            return res.status(401).json({
                status: 401,
                error: 'One of the fields is not correctly formatted'
            });
        }
        return res.status(401).json({
            status: 401,
            error: error.message
        });
    }
});

/**
 * Handles the POST request to log in a user.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {Object} The HTTP response object with status and message indicating the result of the login operation.
 */
authRouter.post('/login', async (req, res) => {
    try {
        const claims = await login(req.body.email, req.body.password);
        const maxAge = 24 * 60 * 62 * 1000

        res.cookie(
            'auth',
            claims,
            {
                maxAge: maxAge,
                httpOnly: true,
            }
        );
        return res.status(200).json({
            status: 200,
            message: 'User successfully logged in!'
        });
    } catch (error) {
        return res.status(404).json({
            status: 404,
            error: error.message
        })
    }
});

/**
 * Handles the POST request to log out a user by clearing the authentication cookie.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {Object} The HTTP response object with status 200 and a JSON body containing the status and message of the logout operation.
 */
authRouter.post('/logout', (req, res) => {
    res.clearCookie('auth');
    return res.status(200).json({
        status: 200,
        message: 'User successfuly logged out!'
    })
});







module.exports = authRouter;