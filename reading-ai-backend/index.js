const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const OpenAI = require('openai');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize OpenAI with v4 syntax
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post('/generate-sentence', async (req, res) => {
  const { level } = req.body;

  let prompt;
  switch (level) {
    case 'beginner':
      prompt = 'Generate a very simple 4-6 word sentence for a 6-year-old child learning to read. Avoid punctuation.';
      break;
    case 'intermediate':
      prompt = 'Generate a medium-length sentence for a 6-year-old child who can read short sentences. Avoid punctuation.';
      break;
    case 'expert':
      prompt = 'Generate a more complex sentence for a 6-year-old child who reads fluently. Avoid punctuation.';
      break;
    default:
      prompt = 'Generate a simple sentence for a 6-year-old child learning to read.';
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 50,
      temperature: 0.7
    });

    const sentence = response.choices[0].message.content.trim();
    res.json({ sentence });
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    res.status(500).json({ error: 'Failed to generate sentence' });
  }
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
