// import { createServer } from "http2";
import { createServer } from "http";

import app from "./app";

const server = createServer(app.listener);

server.listen(8080);
