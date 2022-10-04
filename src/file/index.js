import { writeFileSync } from 'fs';
import { indexBy, transformMapWith } from 'maps';

export function getGNSMapDataArray() {

	const mapArray = [];

	for (let i = 0; i < 119; i++) {

		let ix = i.toString();

		if (i < 10) {

			ix = `00${ix}`

		} else if (i < 100) {

			ix = `0${ix}`

		}

		const filename = `MAP${ix}.json`;
		const map = require(`../../lib/gns/${filename}`);
		mapArray.push(map);

	}

	return mapArray;

}


export function writeMapData(sbbMapDataArray) {

	for (const m of sbbMapDataArray) {

		const { slug } = m;
		// const { starts, tiles, ... rest } = m;

		writeFileSync(`map/${slug}.json`, JSON.stringify(m, null, 2));
		console.log(`Wrote ${slug}`);

	}

	const k = indexBy(sbbMapDataArray, `num`);
	const l = transformMapWith(k, g => {
		const { starts, tiles, ... rest } = g;
		return rest;
	});

	// writeFileSync(`slugs.json`, JSON.stringify(sbbMapDataArray.map(p => p.slug), null, 2));
	writeFileSync(`maps.json`, JSON.stringify(l, null, 2));
	console.log(`[fft-bot/mapper] wrote maps data to maps.json`);

}
