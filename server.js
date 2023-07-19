import express from 'express';
import 'dotenv/config';
import { startApp } from './app.js';

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.get('/', (req, res) => {
	res.send('Hello Wolrd');
});

app.post('/createtourney', (req, res) => {
	res.send('Hello Wolrd');
});

app.listen(PORT, () => {
	startApp();
	console.log(`App running on port ${PORT}`);
});
