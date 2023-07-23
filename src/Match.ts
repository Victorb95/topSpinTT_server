interface PlayerInterface {
	id: string;
}

interface MatchInterface {
	players: [PlayerInterface, PlayerInterface];
	currentSet: number;
	matchData: { [setNumber: number]: { [playerId: string]: { points: number; sets: number } } };
}

class Match implements MatchInterface {
	players: [PlayerInterface, PlayerInterface];
	currentSet: number = 1;
	matchData: { [setNumber: number]: { [playerId: string]: { points: number; sets: number } } } = {};

	constructor(player1: PlayerInterface, player2: PlayerInterface,) {
		this.players = [player1, player2]
		this.initializeMatchData();
	}

	private initializeMatchData() {
		this.matchData[this.currentSet] = {
			[this.players[0].id]: { points: 0, sets: 0 },
			[this.players[1].id]: { points: 0, sets: 0 },
		};
	}

	private getCurrentSetData() {
		return this.matchData[this.currentSet];
	}

	updatePoints(playerId: PlayerInterface['id'], increment: number) {
		const playerData = this.getCurrentSetData()[playerId];
		if (playerData) {
			playerData.points += increment;
		}
	}

	updateSets(playerId: PlayerInterface['id'], increment: number) {
		const playerData = this.getCurrentSetData()[playerId];
		if (playerData) {
			playerData.sets += increment;
		}
	}

	setPlayerState(playerId: PlayerInterface['id'], points: number, sets: number) {
		const playerData = this.getCurrentSetData()[playerId];
		if (playerData) {
			playerData.points = points;
			playerData.sets = sets;
		}
	}

	nextSet() {
		this.currentSet++;
		this.initializeMatchData();
	}
}

function createMatch(player1: PlayerInterface, player2: PlayerInterface) {
	const match = new Match(player1, player2)
	return match
}

export { createMatch };