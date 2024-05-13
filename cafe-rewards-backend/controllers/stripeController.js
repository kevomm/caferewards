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

const getAllConnectedAccounts = async ()=> {
    return await stripe.accounts.list();
}

const getAllProductsFromShop = async (shopId) => {
    return await stripe.products.list({
        stripeAccount: shopId
    });
}

const getCustomer =  async (customerId) => {
    return await stripe.customers.retrieve(customerId);
}

const getCustomerCard = async (customerId) => {
    const customer = await getCustomer(customerId);
    const pm = await stripe.paymentMethods.retrieve(customer.invoice_settings.default_payment_method);
    return pm;
}

const checkout = async (customerId, products, coffeeShop) => {
    const lineItems = products.map(product => ({
        price_data: {
            currency: 'usd',
            product_data: {
                name: product.name,
            },
            unit_amount: product.price,
        },
        quantity: 1,
    }));
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card', 'amazon_pay'],
        customer: customerId,
        line_items: lineItems,
        mode: 'payment',
        success_url: `http://localhost:3001/`,
        cancel_url: `http://localhost:3001/order`,
        payment_intent_data: {
            transfer_data: {
                destination: coffeeShop,
            },
        },
    });
    return session;
}


module.exports = {
    getCustomers,
    createCustomer,
    createCard_setupIntent_create,
    updateCustomerPaymentMethod,
    retrieveSetupIntent,
    getAllConnectedAccounts,
    getAllProductsFromShop,
    checkout
}