export function gnsMapDataToSBBTileArray(map) {
		
	const { starting_locations, surface_types, height, width, upper, lower, num } = map;


	const allTiles = [];

	for (let row of upper) {

		for (let { x, y, no_walk, depth, height, surface_type } of row) {

			const z = 1;
			
			allTiles.push({
				_id:`T-${num}-${z}-${y}-${x}`,
				x,
				y,
				z,
				no_walk,
				depth,
				height,
				start: null,
				surface_type
			})
		}
	}

	for (let row of lower) {

		for (let { x, y, no_walk, depth, height, surface_type } of row) {
			
			const z = 0;
			allTiles.push({
				_id:`T-${num}-${z}-${y}-${x}`,
				x,
				y,
				z:0,
				no_walk,
				depth,
				height,
				start: null,
				surface_type
			})
		}
	}
	// }/



	for (const {x,y,team} of starting_locations.map(({team, ...rest})=>({team: team === "Player 1" ? 0 : 1, ...rest}))) {

		allTiles.find(tile => tile.x === x && tile.y === y).start = team;
		
	}
	
	return allTiles;
}