// importing
import * as dotenv from 'dotenv'
import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbMessages.js';
import connectDB from './config/connectDB.js'




dotenv.config({ debug: true })
console.log(process.env.NODE_ENV)

connectDB();

//App config
const app = express();
const port = process.env.PORT || 9000

//middleware
app.use(express.json());


//???`


//api routes
app.get('/', (req, res)=> res.status(200).send('hello world'))

app.post('/messages/new', (req, res)=>{
    const dbMessages = req.body

    Messages.create(dbMessages, (err, data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    })
});

//Listener and test moongoose connection
mongoose.connection.once('open', ()=>{
    console.log("Connected to MongoBB")
    app.listen(port, () => console.log(`Listening on locahost: ${port}`));

})

mongoose.connection.on('error', err=>{
    console.log(err)
})