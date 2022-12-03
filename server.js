// importing
import * as dotenv from 'dotenv'
import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbMessages.js';
import connectDB from './config/connectDB.js'
import Pusher from 'pusher'





const pusher = new Pusher({
    appId: "1519412",
    key: "51874f4b2abc85062490",
    secret: "196022618a020d5cf00d",
    cluster: "mt1",
    useTLS: true
  });


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


app.get('/messages/sync', (req, res)=>{
    Messages.find((err, data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    })
})

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

// Hold connection 
const db = mongoose.connection;
//Listener and test moongoose connection
  db.once('open', ()=>{
    console.log("Connected to MongoBB")
    app.listen(port, () => console.log(`Listening on locahost: ${port}`));

     const msgCollection = db.collection('messagecontents');
     const changeStream = msgCollection.watch();
     changeStream.on('change', (change) =>{
        console.log('a change occured',change)
     })
})

mongoose.connection.on('error', err=>{
    console.log(err)
})