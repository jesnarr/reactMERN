const express = require('express');
const app = express();
const mongoose = require('mongoose'); //mongoDB library
const bodyParser = require("body-parser"); // reading json
const morgan = require('morgan'); //middleware library for http request
const cors = require('cors');


// allow all http request from other applications to avoid errors no-cors disabled
app.use(cors());
app.options('*',cors());

// helpers
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');

//read environment variables
require('dotenv/config');
// assigning environment variables
const api = process.env.API_URL;

// Routers
const userRouter     = require('./routers/users');
const jobRouter      = require('./routers/jobs');
// const productsRouter = require('./routers/products');
// const categoryRouter = require('./routers/category');
// const orderRouter     = require('./routers/orders');

//middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(morgan('tiny'));
// app.use(authJwt()); //authentication jwt
app.use('/public/uploads', express.static(__dirname + '/public/uploads' )); //static public upload
// app.use(errorHandler());
// handling error
// app.use((err,req,res,next) => {
//     if(err.name === 'UnauthorizedError')
//     {
//         return  res.status(401).json({message: "The user is not authorized"})
//     }
//     if(err.name === 'ValidationError')
//     {
//         return res.status(401).json({message: err})
//     }
//     return res.status(500).json(err);
// });

//Routers
app.use(api+'/users',userRouter);
app.use(api+'/jobs',jobRouter);

// app.use(api+'/products',productsRouter);
// app.use(api+'/category',categoryRouter);
// app.use(api+'/orders',orderRouter);

 
//database connection
const dbConfig = 'mongodb://127.0.0.1:27017';
const dbName = 'test';

mongoose.connect(`${dbConfig}/${dbName}`, {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
},(err) => err ? console.log('Not connected') : console.log('connected'));



//connecting to server
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on port ${port}`)); // server is running
