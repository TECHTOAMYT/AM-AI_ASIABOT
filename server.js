const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

// OpenAI or Custom AI API Key Setup
const OPENAI_API_KEY = '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';

app.post('/ask', async (req, res) => {
    const { question } = req.body;

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: question }]
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${OPENAI_API_KEY}`
                }
            }
        );

        const answer = response.data.choices[0].message.content.trim();
        res.json({ answer });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ answer: 'Sorry, I encountered an error!' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
