import express from "express";
import bodyParser from "body-parser"
import cors from "cors"
import mongoose from "mongoose";
import classRoutes from './routes/classRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import pickupPointsRoutes from './routes/pickupPointRoutes.js'
import productRoutes from './routes/productRoutes.js';
import userAuthRoutes from './routes/auth/userAuthRoutes.js';
import cartRoutes from './routes/cartRoutes.js';

const app = express();
const PORT = 5000;
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('uploads'));

app.use('/', classRoutes)
app.use('/', productRoutes)
app.use('/', categoryRoutes)
app.use('/', pickupPointsRoutes)
app.use('/', userAuthRoutes)
app.use('/', cartRoutes)

const mongoURI ='mongodb+srv://rwmumo:' + encodeURIComponent('L0x0z0aolLy3qu7b')+ '@cluster0.90ekycv.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(mongoURI)
.then(() => console.log('connected to mongo db'))
.catch((err)=>console.log(err.message));

app.listen(PORT,()=>{
    console.log('server listening on port:'+ PORT)
});

// C - create -storing data in the database eg creating a new category :POST
// R - read - retrieving data from the database :GET
// U - update - editing data in the database, change to electronics :POST
// D - delete - deleting from the database:POST

//L0x0z0aolLy3qu7b

