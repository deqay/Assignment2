const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./controllers/config');


const port=8080;
const app = express();

//routes

const productroutes = require('./routes/productroutes');
app.use('/api', productroutes);

app.use(cors());

mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });



app.get('/', (req, res) => {
    res.json({ message: "Welcome to DressStore application." });
  });

  //server

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  