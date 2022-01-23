import { mean as toMean, min } from 'lodash';
import { gnsMapDataToSBBTileArray } from '../utility';

export function seriesToStatistics(series){

    const sampleSize = series.length;
    if (sampleSize === 0 ) {
        return {
            sigma: Infinity,
            mean: 0,
			standardDeviation: 0,
			sampleSize
        }
    }

    const mean = toMean(series);
    const differences = series.map(m => m - mean);
    const variances = differences.map(d => Math.pow(d, 2));
    const variance = toMean(variances);
    const sigma = Math.sqrt(variance);

    return {
        sigma,
        mean,
		sampleSize
    }

}

export function gnsMapDataToMapStats(map) {
	
	const tileArray  =gnsMapDataToSBBTileArray(map);
	const tileCount = tileArray.length;
	const passableTileCount = tileArray.filter(t => !t.no_walk).length;
	const lavaTileCount = tileArray.filter(t => t.surface_type === "Lava").length;
	
	const [tag, otherTag] = [0,1];
	
	const ownStartPositions = tileArray.filter(t => t.start === tag);
	const otherStartPositions = tileArray.filter(t => t.start === otherTag);
	
	const meanDeltas = [];
	const closestDeltas = [];
	const heightDeltas = [];
	
	for (const {x : ownX ,y : ownY,height : ownHeight} of ownStartPositions) {
	
		const distances = [];
	
		for (const {x : otherX ,y : otherY,height : otherHeight} of otherStartPositions) {
	
			const a = Math.pow(ownX + otherX, 2);
			const b = Math.pow(ownY + otherY, 2);
			const c = Math.pow(a + b, 1/2);

			const heightDelta = ownHeight - otherHeight;
	
			distances.push(c);
			
			heightDeltas.push(heightDelta)
		}
		
		meanDeltas.push(toMean(distances));
		closestDeltas.push(min(distances));
	}
	
	// console.table(meanDeltas);
	// console.table(closestDeltas);

	const depthCount_gte1 = tileArray.filter(t => t.depth >= 1).length;
	const depthCount_gte2 = tileArray.filter(t => t.depth >= 2).length;
	
	const analysis = {
		name:map.gns,
		number:map.num,
		tileCount,
		passableTilePercentage : passableTileCount / tileCount,
		lavaTilePercentage:  lavaTileCount / tileCount,
		depthCount_gte1Percentage: depthCount_gte1 / tileCount,
		depthCount_gte2Percentage: depthCount_gte2 / tileCount,
		heightStandardDeviation:seriesToStatistics(tileArray.map(t => t.height)).sigma,
		averageMeanStartingDelta: toMean(meanDeltas),
		averageClosestStartingDelta: toMean(closestDeltas),
		meanTeam1HeightAdvantage: toMean(heightDeltas)
	};
	
	
	// console.table(analysis);

	return analysis;
}

