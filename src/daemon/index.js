import { gnsMapDataToMapStats, seriesToStatistics } from '../reducers';

export function generateMapStatistics() {

	const statsArray = [];

	for (let i = 0; i < 130; i++) {
	
		let ix = i.toString();
	
		if (i < 10) {
	
			ix = `00${ix}`
	
		} else if (i < 100) {
	
			ix = `0${ix}`
	
		}
	
		try {
	
			const mapName = `MAP${ix}.json`;
			const map = require(`../../lib/fft-map-json/data/${mapName}`);
			const stats= gnsMapDataToMapStats(map);
			statsArray.push(stats);
	
		} catch (e) {
	
			console.log(`[fft/mapper] Small complication loading map #${i}`);
	
		}
	}

	const beta = {};

	for (const key of [
		"tileCount",
		"passableTilePercentage",
		"lavaTilePercentage",
		"depthCount_gte1Percentage",
		"depthCount_gte2Percentage",
		"heightStandardDeviation",
		"averageMeanStartingDelta",
		"averageClosestStartingDelta",
		"meanTeam1HeightAdvantage"
	]) {

		const series = statsArray.map(s => s[key]);
		beta[key] = seriesToStatistics(series);

	};

	console.table(beta);

	const normalizedStatsMap = {};

	for (const stats of statsArray) {

		const normalizedStats = {};

		for (const [key,{mean, sigma}] of Object.entries(beta)) {

			const value = stats[key];
			const variance = value - mean;
			const standardDeviation = variance / sigma;
			normalizedStats[key] = ~~standardDeviation;

		}

		normalizedStatsMap[stats.number] = normalizedStats;
	}

	const minMap = {};
	const normalizedStats = Object.values(normalizedStatsMap);

	for (const key in normalizedStats[0]) {

		minMap[key] = Math.min(...normalizedStats.map(a => a[key]))

	}

	// console.table(minMap);
	
	for (const stats of normalizedStats) {
		
		for(const key in stats) {
			
			stats[key] -= minMap[key] - 1;
			
		}
	}
	
	// console.table(normalizedStatsMap);
	return [beta,normalizedStatsMap];


}

export const [beta,maps] = generateMapStatistics();