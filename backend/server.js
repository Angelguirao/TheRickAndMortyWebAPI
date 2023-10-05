// Import necessary libraries
const express = require('express'); // Express.js for creating the server
const axios = require('axios'); // Axios for making HTTP requests
const cors = require('cors'); // CORS middleware for handling cross-origin requests
require('dotenv').config(); // Load environment variables from a .env file

// Create an instance of the Express application
const app = express();

// Use the cors middleware and specify the frontend's origin
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000' }));

// Handle GET request to the root endpoint
app.get('/', async (req, res) => {
  try {
    // Send a GraphQL query to an external API
    const response = await axios.post('https://rickandmortyapi.com/graphql', {
      query: `
        {
          characters(filter: { species: "Human" }) {
            results {
              name
              id
              image
              species
              status
            }
          }
        }
      `,
    });
    // Send the results as JSON
    res.json(response.data.data.characters.results);
  } catch (error) {
    // Handle errors and send an error response
    console.error('Error fetching human characters:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
