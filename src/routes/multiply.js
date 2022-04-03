import express from "express";

const router = express.Router();

router.post("/", (req, res) => {
  const { a, b } = req.body;

  res.json({
    result: a * b,
  });
});

export default router;