const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/user');
const booksRoutes = require('./routes/books');
const orderRoutes = require('./routes/orders');
const auth = require('./Authentication')

require('dotenv').config();



const app = express();
app.use(cors())

const port = process.env.PORT || 5000;

// for local database

// mongoose
//   .connect('mongodb://localhost:27017', { useNewUrlParser: true })
//   .then(() => console.log(`Database connected successfully`))
//   .catch((err) => console.log(err));

// mongo db atlas
  mongoose
  .connect(`mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWARD}@cluster0.ivj27.gcp.mongodb.net/`, { useNewUrlParser: true })
  .then(() => console.log(`Database connected successfully`))
  .catch((err) => console.log(err));  

  
 
app.use(bodyParser.json());
app.use('/books', booksRoutes);
app.use('/order', orderRoutes);
app.use('/usersapi', userRoutes);
// app.get("/welcome", auth, (req, res) => {
//   res.status(200).send("Welcome  ");
// });


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});