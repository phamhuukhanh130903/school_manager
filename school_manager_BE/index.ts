import express from "express";
import bodyParser from 'body-parser';
import { AppDataSource } from "./src/configs/dataSource";
import cookieParser from 'cookie-parser';
import route from "./src/routes/index.route";
import dotenv from "dotenv";
import cors  from "cors"
const PORT = 8000;
dotenv.config();
const app = express();
app.use(cors({origin: "http://localhost:3000", credentials: true}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
AppDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!")
  })
  .catch((err) => {
    console.log("Error during Data Source initialization:", err)
  })


route(app);

app.listen(PORT, () => {
  console.log("App running with port: " + PORT)
})



