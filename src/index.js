import { maps, beta } from "./daemon";
import { writeFileSync } from 'fs';
import './server';

console.info("[fft/mapper] Generating statistics");

writeFileSync('maps.json', JSON.stringify(maps,null,2));
writeFileSync('beta.json', JSON.stringify(beta,null,2));

console.info("[fft/mapper] Generating statistics complete, data written to file.");