const stripe = require('stripe')('sk_test_51Ors4O01PBnNHA0XRwcZVEvHlWebwr3JIO56mX1rItFomlBtn5IRPvGsWdqVNpdl5uhofYx9Itsai2m13IfBJdPY00Kg5MOcYi')

async function getCustomers() {
    const customers = await stripe.customers.list()
    console.log(customers)
}

const createCustomer = async (email, name)=> {
    const customer = await stripe.customers.create({
        name: name,
        email: email
    })
}

createCustomer('kevin.perezgali@gmail.com', 'Kevin Perez')