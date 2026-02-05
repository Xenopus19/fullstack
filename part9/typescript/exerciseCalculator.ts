import { parseNumber } from "./utils";

export interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export interface ExerciseInput {
  target: number;
  days: number[];
}

export const parseExerciseInput = (args: string[]): ExerciseInput => {
  if (args.length < 4)
    throw new Error(
      "The program should receive target argument and at least one value for days.",
    );

  return {
    target: parseNumber(args[2]),
    days: args.slice(3).map((n) => parseNumber(n)),
  };
};

export const calculateExercises = (input: ExerciseInput): Result => {
  const hours: number[] = input.days;
  const target: number = input.target;

  const average: number = hours.reduce((acc, h) => acc + h) / hours.length;
  const rating: number = Math.round(average / target);

  const result: Result = {
    periodLength: hours.length,
    trainingDays: hours.filter((h) => h != 0).length,
    target: target,
    average: average,
    success: average >= target,
    rating: rating,
    ratingDescription: rating < 1 ? "Not enough" : "Well done",
  };
  return result;
};

try {
  const input = parseExerciseInput(process.argv);
  console.log(calculateExercises(input));
} catch (error: unknown) {
  let errorMessage = "An error happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
