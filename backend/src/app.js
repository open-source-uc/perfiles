import Koa from "koa";
import KoaBody from "koa-body";
import KoaLogger from "koa-logger";
import router from "./routes";

const app = new Koa();

// Logs request from the server
app.use(KoaLogger());

// Parses the request body
app.use(KoaBody());

// Routes
app.use(router.routes());
