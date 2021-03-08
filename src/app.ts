import express from "express";
import bodyParser from "body-parser";
import router from "./routes/router";
import userRoutes from "./routes/userRoutes";
import { UserRepository } from "./repositories/UserRepository";

const app = express();
const version = "/v1";

const usersRepo = new UserRepository();
app.use(bodyParser.json());
app.use(version, router);
app.use(version, userRoutes);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT,() => {
    console.log(`Server listening at port ${PORT}...`);
});

export { app, server, usersRepo };