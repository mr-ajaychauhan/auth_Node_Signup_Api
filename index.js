const express =require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/auth')
require('dotenv/config')
const postRoute = require('./PrivateRoute/Post');

const app = express();
const PORT = 5500;

app.use(express.json());

app.use('/api/user',userRoutes);
app.use('/api/post',postRoute);


app.get('/',(req,res)=>{
  res.send('we are in Home Page');
});

mongoose.connect(process.env.db_URL,()=>{
  console.log('DB is Connect');
});

app.listen(PORT,()=>{
  console.log(`Server is Running on http://localhost:${PORT}`);
})
