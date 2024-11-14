const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes')

// DB connection
const connectDB = async () =>{
    try {
        await mongoose.connect("mongodb+srv://info6150user:admin@info6150fall2023.ijcaexm.mongodb.net/switfApp?retryWrites=true&w=majority", {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
      } catch (err) {
        console.error(err.message);
        process.exit(1);
      }

}

connectDB();

const app = express()

app.use(express.json())

app.get('/', (req, res) =>{
    res.send('Api is running..');
})

// Use the combined route
app.use('/api/', router);


app.listen(8008, () => console.log('Server Running on Port 8008'));