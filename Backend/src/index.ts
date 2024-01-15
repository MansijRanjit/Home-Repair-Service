import express from "express";
import cors from "cors";

import serverConfig from "./config";
import routes from "./routes";
import { genericErrorHandler, notFoundError } from "./middleware/errorHandler";

const app = express();

app.use('/src/uploads',express.static('src/uploads'));

app.use(cors());

app.use(express.json());

app.use(routes);

app.use(genericErrorHandler);

app.use(notFoundError)

app.listen(serverConfig.serverPort,()=>{
  console.log(`Server is listening at port ${serverConfig.serverPort}`);
});