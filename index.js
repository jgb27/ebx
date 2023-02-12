import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const configuration = new Configuration({
  apiKey: process.env.api_key,
});

const openai = new OpenAIApi(configuration);

app.get('/', (req, res) => {
  res.status(200).send('/index.html');
});

let nQuestion = '';

app.post('/api', async (req, res) => {
  try {
    let sQuestion = req.body.data;
    let sAnswer = '';
    nQuestion += sQuestion + sAnswer;
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: nQuestion,
      temperature: 1,
      max_tokens: 2048,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0.6,
      stop: [" Human:", " AI:"],
    });

    sAnswer = `\nAI: ${response.data.choices[0].text.replace(/\n\n/g, '')}\n`;
    nQuestion += sAnswer;

    // replace answer para AI: e Human: para ficar mais bonito
    nQuestion = nQuestion.replace(/AI:/g, 'AI: ').replace(/Human:/g, 'Human: ');

    nQuestion = nQuestion.replace(/Robot:/g, '');
    nQuestion = nQuestion.replace(/Robô:/g, '');
    nQuestion = nQuestion.replace(/AI:  /g, 'AI: ').replace(/Human:  /g, 'Human: ');

    res.status(200).json({ ai: sAnswer, questions: nQuestion });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

app.listen(PORT, () => {
  console.log('Rodando na porta ' + PORT);
});