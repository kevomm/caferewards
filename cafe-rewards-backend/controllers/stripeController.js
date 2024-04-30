const stripe = require('stripe')(process.env.STRIPE_KEY);
const User= require('../models/user');



const getCustomers = async ()  => {
    const customers = await stripe.customers.list();
    console.log(customers);
}

const createCustomer = async (email, name)=> {
    const customer = await stripe.customers.create({
        name: name,
        email: email
    });
    await User.update({stripeId: customer.id}, {where : {email: email}});
}

const createCard_setupIntent_create = async (stripeCustomerId) => {
    const setupIntent = await stripe.setupIntents.create({
        automatic_payment_methods: {
            enabled: true
        },
        customer: stripeCustomerId
    });
    return setupIntent.client_secret;
}

const updateCustomerPaymentMethod = async (stripeCustomerId, paymentMethodId) => {
    await stripe.customers.update(
        stripeCustomerId,
        {
            invoice_settings: {default_payment_method: paymentMethodId}
        }
    );
}

const retrieveSetupIntent =  async (setupId) => {
    return await stripe.setupIntents.retrieve(setupId);
}

module.exports = {
    getCustomers,
    createCustomer,
    createCard_setupIntent_create,
    updateCustomerPaymentMethod,
    retrieveSetupIntent
}