import { mean } from "lodash";
import { indexBy, indexWith, transformMapBy, transformMapWith } from "maps";

import names from '../../lib/names.json';
import { getGNSMapDataArray } from "../file";

const toTileId = (num) => ({ x, y, z = 0 }) => `m${num}-${z}-${y}-${x}`;

function toTileArray({ lower, upper, num }) {

	const func1 = toTileId(num);

	const a = lower.flat();
	const b = upper.flat();

	const c = a.map(t => ({ ...t, z: 0 }));
	const d = b.map(t => ({ ...t, z: 1 }));
	const e = [...c, ...d];

	const f = e.map(t => ({ ...t, _id: func1(t) }));
	const g = f.filter(t => (!t.no_walk && !t.no_cursor));
	const h = g.map(t => {

		const { height, slope_type } = t;
		const trueHeight = height + (slope_type === 'Flat 0' ? 0 : (1 / 2));
		return { ...t, trueHeight };

	})

	return h;

}

function toStartingLocationArray({ starting_locations, num }) {

	const func1 = toTileId(num);
	const starts = [
		starting_locations.filter(s => s.team === "Player 1").map(func1),
		starting_locations.filter(s => s.team === "Player 2").map(func1)
		
	];

	return starts;

}



function toFirst(map) {

	const tileArray = toTileArray(map);
	const tiles = indexBy(tileArray, `_id`);
	const position = transformMapWith(tiles, ({ x, y, z }) => ({ x, y, z }));
	const surfaceType = transformMapBy(tiles, `surface_type`);
	const depth = transformMapBy(tiles, `depth`);
	const trueHeight = transformMapBy(tiles, `trueHeight`);

	const mapped = tileArray.map(f => f._id).map(_id => ({
		_id,
		...position[_id],
		depth: depth[_id],
		height: trueHeight[_id],
		surface: surfaceType[_id],
	}));

	return mapped

};

export function getSBBMapDataArray() {

	const gnsMapDataArray = getGNSMapDataArray();
	const sbbMapDataArray = gnsMapDataArray.map(map => {

		const { num, surface_types } = map;
		const name = names[num];
		const slug = `${num}-${name.replace(/[ ]/g, `-`).toLowerCase()}`;
		const tiles = toFirst(map);
		const starts = toStartingLocationArray(map, num);
		const tileMap = indexBy(tiles, `_id`);

		const deltasH = [];
		const deltasV = [];

		const team = 0;
		const otherTeam = 1;

		for (const unitA of [0,1,2,3]) {

			for (const otherUnit of [0,1,2,3]) {

				const _id1 = starts[team][unitA];
				const _id2 = starts[otherTeam][otherUnit];

				const { x : x1, y : y1, height : height1 } = tileMap[_id1];
				const { x : x2, y : y2, height : height2 } = tileMap[_id2];

				const deltaH = Math.abs(x2 - x1) + Math.abs(y2 - y1);
				const deltaV = Math.abs(height2 - height1);

				deltasH.push(deltaH);
				deltasV.push(deltaV);
			}
		}

		const positionDelta = +mean(deltasH).toFixed(3);
		const heightDelta = +mean(deltasV).toFixed(3);

		return {
			slug,
			num,
			name,
			surfaces: surface_types,
			starts,
			positionDelta,
			heightDelta,
			tiles
		};

	});

	return sbbMapDataArray;

}