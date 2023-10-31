import "dotenv/config";

import fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import multipart from "@fastify/multipart";
import UserModel from "../application/model/user";
import WineModel from "../application/model/wine";
import FoodModel from "../application/model/food";
import UploadModel from "../application/model/upload";
import FeedModel from "../application/model/feed";

export const app = fastify();

app.register(multipart);

app.register(require("@fastify/static"), {
  root: __dirname + "/upload",
  prefix: "/upload/",
});

console.log(__dirname + "/upload");

app.register(cors, {
  origin: true,
});

app.register(jwt, {
  secret: "thisismynewapp",
});

app.register(UserModel);
app.register(WineModel);
app.register(FoodModel);
app.register(UploadModel);
app.register(FeedModel);

app
  .listen({
    port: 3030,
    host: "0.0.0.0",
  })
  .then(() => console.log("HTTP server running on http://localhost:3030"));
