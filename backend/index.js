import express from 'express'
import { PORT , MongoURl } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import router from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

//allow Custom Origins
/*
app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'], // Allow both localhost and 127.0.0.1
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}));
*/

//parse the req
app.use(express.json());

//allow all Origins with Deafault
app.use(cors());

app.use('/books',router)

app.get('/', (req,res)=> {
    
   res.send('welcome home');

})

mongoose.connect(MongoURl).then(()=> {
    console.log("connect success")
    app.listen(PORT,()=> {
        console.log(`server is listening on port ${PORT}`);
    });
}).catch((error)=> {
    console.log("connect fail");
    console.log(error)
});