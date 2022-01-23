import express from "express";
import cors from "cors";
import { maps, beta } from '../daemon';

const app = new express();
app.use(cors());
app.use("/",(_req,res)=>{
	res.json({
		maps,
		beta
	})
});

const PORT = process.env.MAPPER_PORT || 10001;
app.listen(PORT, console.info(`[fft/mapper] Listening http://localhost:${PORT}`));