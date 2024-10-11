import express from "express";
import db from "./db/conn.js"
import {routers} from "./routers/indexRouter.js";
import * as dotenv from "dotenv";

dotenv.config();
const app = express();
const port = process.env.PORT;
const uri = process.env.DB_URI;

app.use(express.json());
app.use("/api", routers);
app.listen(port, async () => {
    db(uri);
});