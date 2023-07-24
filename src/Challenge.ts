import { PlayerInterface } from "./Player";

interface ChallengeInterface {
	id: string;
	senderId: string;
	receiverId: string;
	date: number;
	status: "pending" | "accepted" | "rejected";
}

class Challenge implements ChallengeInterface {
	id: string;
	senderId: string;
	receiverId: string;
	date: number;
	status: "pending" | "accepted" | "rejected";

	constructor(data: ChallengeInterface) {
		this.id = data.id;
		this.senderId = data.senderId;
		this.receiverId = data.receiverId;
		this.date = data.date;
		this.status = data.status
	}

	acceptChallenge(playerId: string) {
		if (playerId === this.receiverId) {
			this.status = "accepted";
		} else {
			console.log("Você não tem permissão para aceitar o desafio.");
		}
	}

	rejectChallenge(playerId: string) {
		if (playerId === this.receiverId) {
			this.status = "rejected";
		} else {
			console.log("Você não tem permissão para recusar o desafio.");
		}
	}

	getStatus(): "pending" | "accepted" | "rejected" {
		return this.status;
	}

	isPending(): boolean {
		return this.status === "pending";
	}
}

export { Challenge, ChallengeInterface };
