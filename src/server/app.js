const express = require('express');
const OpenAI = require('openai');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); 

async function openAIResponse(text) {
    try {
        const openai = new OpenAI({
            apiKey: OPENAI_API_KEY,
        });

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-0125",
            messages: [
                {
                    "role": "system",
                    "content": "task:whatever user ask just only return any cmd"
                },
                {
                    "role": "user",
                    "content": text
                }
            ],
            temperature: 0,
            max_tokens: 500,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });
        const message = response.choices[0].message.content;
        return message;
    } catch (error) {
        console.error("Error occurred while communicating with OpenAI:", error);
        return null;
    }
}

app.post('/', async (req, res) => {
    try {
        const text = req.body.message;
        const response = await openAIResponse(text);

        if (response) {
            console.log(response);
            res.json({ message: response });
        } else {
            res.status(500).send("Error occurred while communicating with OpenAI");
        }
    } catch (error) {
        console.error("Error occurred while handling request:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
