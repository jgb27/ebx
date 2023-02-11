import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get('/', (req, res) => {
  res.status(200).send('/index.html');
});

app.post('/api', (req, res) => {
  res.status(200).json({ message: 'Requisição recebida com sucesso!', body: req.body });
});

app.listen(PORT, () => {
  console.log('Rodando na porta ' + PORT);
});