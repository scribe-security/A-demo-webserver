const express = require('express');
const axios = require('axios');
const { createCanvas } = require('canvas');
const app = express();
const port = 3000;

// Replace with the actual URL of the random-values-app API
const apiEndpoint = 'http://prng-container:5000/api/endpoint'; // Adjust the endpoint as needed

// Function to draw a star
function drawStar(ctx, n, r, x, y) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    for (let i = 1; i <= 2 * n; i++) {
        const angle = i * Math.PI / n;
        const radius = i % 2 === 0 ? r : r / 2;
        ctx.lineTo(x + radius * Math.cos(angle), y + radius * Math.sin(angle));
    }
    ctx.closePath();
    ctx.stroke();
}

// Endpoint to serve the star image
app.get('/', async (req, res) => {
    try {
        const response = await axios.get(apiEndpoint);
        const { value1: n, value2: r, value3: x, value4: y } = response.data;

        // Create a canvas with sufficient size
        const canvas = createCanvas(500, 500);
        const ctx = canvas.getContext('2d');

        // Draw the star
        drawStar(ctx, n, r, x , y );

        // Set response headers
        res.setHeader('Content-Type', 'image/png');

        // Send the canvas as a PNG image
        canvas.pngStream().pipe(res);
    } catch (error) {
        res.status(500).send('Error fetching random values');
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
