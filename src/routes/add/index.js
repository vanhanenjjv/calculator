import { Router } from "express";

const addRouter = Router();

addRouter.post("/", (req, res) => {
  const { a, b } = req.body;

  return res.json({
    result: a + b,
  });
});

export { addRouter };
