const express = require('express');
const aiRoutes = require('./routes/ai.routes');
const cors = require('cors');

const app = express();

// 1. Better CORS configuration
// This allows your specific Vercel frontend to talk to this backend
app.use(cors({
    origin: 'https://code-reviewer-six-sigma.vercel.app',
    methods: ['GET', 'POST'],
    credentials: true
}));

app.use(express.json());

// 2. Descriptive Root Route
// Instead of just 'Hello World', this helps you verify the API is alive
app.get('/', (req, res) => {
    res.json({
        status: "Active",
        message: "AI Code Reviewer API is running",
        endpoints: {
            review: "/ai/get-review"
        }
    });
});

// 3. AI Routes
app.use('/ai', aiRoutes);

module.exports = app;
