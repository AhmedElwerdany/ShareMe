const express = require('express');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose');

app.use(cors())
app.use(express.json());

const users = require('./routes/users')
app.use('/users',users)

mongoose.connect('mongodb://localhost/share',{useNewUrlParser:true,useUnifiedTopology: true})

mongoose.connection.once('open',() =>{
    console.log('mongodb is connected')
})

app.listen(4000,()=>{
    console.log('listen')
})