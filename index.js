
const connectDB = require('./startup/db');
const express = require('express');
const app = express();
const cors = require('cors');


//where your routes go
// const route = require('./routes/routename');
const auth = require ('./routes/auth');
const user = require ('./routes/users');
const products = require ('./routes/productsCopy');

connectDB(); 


app.use(cors())
app.use(express.json());
app.use('/api/auth', auth)
app.use('/api/users', user)
app.use('/api/products', products);

// where your api endpoint is: app.use('/api/endpoint', endpoint);

const port = process.env.PORT || 6000;
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});