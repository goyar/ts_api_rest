import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
    const contentType = req.header('Content-Type')!;
    if (contentType === undefined || contentType.toUpperCase() == 'application/json'.toUpperCase()) {
        res.sendStatus(200);
    }
    res.sendStatus(300);
});

export default router;