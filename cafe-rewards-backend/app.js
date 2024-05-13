const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const express = require('express');
require('dotenv').config();
const cors = require('cors')
const app = express();
const User = require('./models/user');
const { getAllConnectedAccounts, getAllProductsFromShop } = require('./controllers/stripeController');

// db
const sequelize = require('./config/config');

// cors
app.use(cors({
    credentials: true,
    origin: ['http://localhost:3001', 'http://172.233.189.185:3001']
}));

// http parsers
app.use(bodyParser.json());
app.use(cookieParser());

// auth routes
app.use('/auth', authRoutes);






app.get('/getusers', async (req, res) => {
    const u = await User.findAll();
    res.json({
        users: u
    })
});

app.get('/getcoffeeshops', async (req, res) => {
    const a = await getAllConnectedAccounts();
    res.json({
        accounts: a
    });
});






app.get('/getproducts/:id', async (req, res) => {
    const urlId = req.params.id;
    try {
        const products = await getAllProductsFromShop(urlId);
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, async () => {
    await sequelize.sync();
    console.log(`Server running on port ${PORT}`);
});
