const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const express = require('express');
require('dotenv').config();
const cors = require('cors')
const app = express();
const User = require('./models/user');

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

const PORT = process.env.PORT || 3001;
app.listen(PORT, async () => {
    await sequelize.sync();
    console.log(`Server running on port ${PORT}`);
});
