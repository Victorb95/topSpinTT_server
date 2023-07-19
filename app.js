import { Tourney } from './Tourney.js';

function startApp() {
	let app = {
		runningTourneys: [],

		createTourney(name, options) {
			return DB.createTourney(name, options);
		},

		setTourneyOpts(tourneyId, options) {
			DB.setTourneyOpts(tourneyId, options);
		},

		terminateTorney(tourneyId) {
			app.runningTourneys = app.runningTourneys.filter(t => t.id != tourneyId);
		},

		startTourney(tourneyId) {
			const { id, name, options } = app._getTourney(tourneyId);

			const requiredOpts = ['type'];
			if (requiredOpts.includes(options.type)) {
				app.runningTourneys.push(new Tourney(id, name, options));
			}
			//		TODO melhorar mensagem
			else console.log('Can\'t start without required Opts');
		},

		_getTourney(tourneyId) {
			return DB.getTourney(tourneyId);
		}

	};
	return app;
}
const DB = {
	tourneys: [
		{
			id: 0,
			name: 'torneio teste 1',
			options: {
				type: 'test'

			}
		}
	],

	createTourney(name, options) {
		let tourney = {
			id: DB.tourneys.length + 1,
			name,
			options
		};
		DB.tourneys.push(tourney);
		return tourney;
	},

	getTourney(tourneyId) {
		return DB.tourneys.filter(t => t.id == tourneyId);
	},
	deleteTorney(tourneyId) {
		DB.tourneys = DB.tourneys.filter(t => t.id != tourneyId);
	},

	setTourneyOpts(tourneyId, options) {
		let tourney = DB.tourneys.filter(t => t.id == tourneyId);

		options.forEach(optKey => {
			if (tourney.options[optKey]) {
				tourney.options[optKey] = options[optKey];
			}
			else {
				console.log(`Invalid Option:${optKey}`);
			}
		});
	}
};

export { startApp };