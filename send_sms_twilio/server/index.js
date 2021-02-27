const express = require('express');
const cors = require('cors');
const twilio = require('twilio');
const dotenv = require('dotenv');

//add twilio --texting API
const sidAccount = process.env.SID_ACCOUNT;
const authToken = process.env.AUTH_TOKEN;

const client = new twilio(sidAccount, authToken);


const app = express();
app.use(cors());
dotenv.config();

//Welcome Page for the Server 
app.get('/', (req, res) => {
    res.send('Welcome to the Express Server')
})

//Twilio test
app.get('/send-text', (req, res) => {
   
    res.send('Hello Twilio Server')
//GET variables passed via query string
    const { recipient, textmessage } = req.query;

    //Send Text
    client.messages.create({
        body: textmessage,
        to: '+1' + recipient,  // Text this number
        from: '+15075196131' // From a valid Twilio number
    }).then((message) => console.log(message.body));
})

app.listen(3300, () => console.log("Running on Port 3300"))
