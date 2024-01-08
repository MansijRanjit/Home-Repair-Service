import express from "express";

import serverConfig from "./config";
import routes from "./routes";
import { genericErrorHandler, notFoundError } from "./middleware/errorHandler";

const app = express();

app.use(express.json());

app.use(routes);

app.use(genericErrorHandler);

app.use(notFoundError)

app.listen(serverConfig.serverPort,()=>{
  console.log(`Server is listening at port ${serverConfig.serverPort}`);
});