import express from "express";
import { usersRepo } from "../app";

const router = express.Router();

router.post("/users", async (req, res) => {
    let user = req.body;
    let newUser: string;
    try {
        if (usersRepo.isValid(user)){
            newUser = await usersRepo.create(user);
            res.status(201);
            res.json(JSON.parse(newUser));
        } else {
            res.status(400);
            res.json({error: "User has to be valid."});
        }
    } catch(error) {
        res.status(500);
        res.json({error: error.message});
    }
});

export default router;