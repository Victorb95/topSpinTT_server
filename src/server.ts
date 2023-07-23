import express from 'express';
import 'dotenv/config';
import { createMatch } from './Match';

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.get('/', (req, res) => {
	res.send('Hello Wolrd');
});

app.post('/createMatch', (req, res) => {
	const {player1, player2 } = req.body;
	const match = createMatch(player1,player2)
});

app.listen(PORT, () => {
	console.log(`App running on port ${PORT}`);
});

