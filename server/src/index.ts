import express from "express";
import routeS from "./route/route"

const app = express();

app.use("/users", routeS)

app.listen(3000)