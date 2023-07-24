import { Challenge, ChallengeInterface } from "./Challenge";
import { DB } from "./database";

interface PlayerInterface {
	id: string;
	name?: string;
	avatar?: string; // path/to/avatar.png
	sentChallenges: Challenge[];
	receivedChallenges: Challenge[];
}

class Player implements PlayerInterface {
	id: string;
	name?: string;
	avatar?: string;
	sentChallenges: Challenge[] = [];
	receivedChallenges: Challenge[] = [];

	constructor(id: string, name?: string, avatar?: string) {
		this.id = id;
		this.name = name;
		this.avatar = avatar;
	}

	async createChallenge(senderId: string, receiverId: string, date: number): Promise<Challenge | Error> {
		try {
			const now = Date.now();
			const data: ChallengeInterface = await DB.insertChallenge(senderId, receiverId, date);

			if (!data) {
				throw new Error("Falha ao inserir a challenge no banco de dados.");
			}
			return new Challenge(data);
		}
		catch (e: any) {
			return new Error("Erro ao criar a challenge: " + e.message);
		}
	}

}

async function createChallenge(playerId: string, receiverId: string, date: number) {
	if (!validatePlayer(playerId, receiverId)) return { error: "Erro ao criar a challenge: " };

	const reqPlayer = new Player(playerId);
	try {
		const challenge = await reqPlayer.createChallenge(playerId, receiverId, date);
		return challenge;
	} catch (error) {
		return { error: "Erro ao criar a challenge: " };
	}
}

function validatePlayer(playerId: string, receiverId: string) {
	if (playerId && receiverId && typeof playerId == 'string' && typeof receiverId == 'string') return true;
	else return false
}

export { Player, PlayerInterface, createChallenge };
