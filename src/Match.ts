import { PlayerInterface } from "./Player";

interface MatchInterface {
	players: PlayerInterface[];
	currentSet: number;
	matchData: MatchDataInterface;

	updatePoints(playerId: PlayerInterface['id'], increment: number): void;
	updateSets(playerId: PlayerInterface['id'], increment: number): void;
	setMatchState(matchState: MatchDataInterface): void;
}

interface MatchDataInterface {
	[gameIndex: number]: {
		[playerId: string]: {
			points: number;
			sets: number;
		};
	};
}

class Match implements MatchInterface {
	players: PlayerInterface[];
	currentSet: number = 1;
	matchData: MatchDataInterface = {};

	constructor(player1: PlayerInterface, player2: PlayerInterface) {
		this.players = [player1, player2];
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

	setMatchState(matchState: MatchDataInterface) {
		this.matchData = matchState;
	}

	nextSet() {
		this.currentSet++;
		this.initializeMatchData();
	}
}

export { Match };