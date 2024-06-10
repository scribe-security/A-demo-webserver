const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

// Replace with the actual URL of the random-values-app API
const apiEndpoint = 'http://localhost:5000/api/endpoint'; // Adjust the endpoint as needed

app.get('/', async (req, res) => {
    try {
        const response = await axios.get(apiEndpoint);
        const randomValues = response.data;

        res.send(`
            <html>
                <head>
                    <title>Random Values</title>
                </head>
                <body>
                    <h1>Random Values</h1>
                    <ul>
                        <li>Value 1: ${randomValues.value1}</li>
                        <li>Value 2: ${randomValues.value2}</li>
                        <li>Value 3: ${randomValues.value3}</li>
                        <li>Value 4: ${randomValues.value4}</li>
                    </ul>
                </body>
            </html>
        `);
    } catch (error) {
        res.status(500).send('Error fetching random values');
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
