import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { parseNumber } from "./utils";
import {
  calculateExercises,
  ExerciseInput,
  Result,
} from "./exerciseCalculator";
const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;

  if (
    !height ||
    typeof height !== "string" ||
    !weight ||
    typeof weight !== "string"
  ) {
    return res.status(400).json({ error: "malformatted parameters" });
  }
  try {
    const result = {
      heigth: height,
      weigth: weight,
      bmi: calculateBmi(parseNumber(height), parseNumber(weight)),
    };
    return res.json(result);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(400).json({error:'An error occured'})
  }
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target)
    return res.status(400).json({ error: "parameters missing" });

  if (!Array.isArray(daily_exercises) || isNaN(Number(target))) {
    return res.status(400).json({ error: "malformatted parameters" });
  }
  try {
    const input: ExerciseInput = {
      days: daily_exercises.map((d) => Number(d)),
      target: Number(target),
    };
    const result: Result = calculateExercises(input);
    return res.json(result);
  } catch {
    return res.status(400).json({ error: "malformatted parameters" });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
