import express from 'express';
import 'dotenv/config';
import { Player, createChallenge } from './Player';

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.get('/', (req, res) => {
	res.send('Hello Wolrd');
});

app.post("/newChallenge", async (req, res) => {
	const { playerId, receiverId, date } = req.body;

	const resp = await createChallenge(playerId, receiverId, date);
	if (resp) res.json(resp);
});



app.listen(PORT, () => {
	console.log(`App running on port ${PORT}`);
});

