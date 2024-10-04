const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config()

const app = express();
app.use(cors(
  {
    methods : ["POST", "GET"],
    credentials : true,
    origin: "*",
  }
));
app.use(express.json());

// MongoDB Atlas URI
const uri = process.env.MONGODB_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true },);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Schema for the 'Information' collection
const dataSchema = new mongoose.Schema({}, { collection: 'Information' });
const Data = mongoose.model('Data', dataSchema);

// Fetch all data endpoint with search and sort
app.get('/api/data', async (req, res) => {
  const { query, sortBy, order } = req.query;
  try {
    let dataQuery = {};
    
    // Handle search query
    if (query) {
      const searchWords = query.split(' ').map(word => new RegExp(word, 'i'));
      dataQuery = {
        $and: searchWords.map(word => ({
          $or: [
            { 'Main food description': word },
            { 'WWEIA Category description': word },
            // Add more fields as needed for search
          ]
        }))
      };
    }
    
    // Perform sorting based on sortBy and order
    const sortCriteria = {};
    if (sortBy) {
      sortCriteria[sortBy] = order === 'desc' ? -1 : 1;
    }
    
    const data = await Data.find(dataQuery).sort(sortCriteria);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Fetch single data item by ID endpoint
app.get('/api/data/:id', async (req, res) => {
  try {
    const data = await Data.findById(req.params.id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/code/:foodcodes', async (req, res) => {
  try {
    // Extract food codes from request parameters
    const foodCodes = req.params.foodcodes.split(',').map(code => parseInt(code.trim()));

    // Construct query to find documents with food codes in the array
    const queries = {
      "Food code": { $in: foodCodes }
    };

    // Query the database
    const codes = await Data.find(queries);
    res.json(codes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});