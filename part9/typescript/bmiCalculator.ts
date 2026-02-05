import { parseNumber } from "./utils";

export const parseBmiInput = (args: string[]): number[] => {
  if (args.length != 4)
    throw new Error("The program should receive two arguments.");

  return [parseNumber(args[2]), parseNumber(args[3])];
};

export const calculateBmi = (heigth: number, weight: number): string => {
  if (heigth <= 0 || weight <= 0) {
    throw new Error("Provided not valid arguments for BMI");
  }
  const meterHeight: number = heigth / 100;
  const bmi: number = weight / (meterHeight * meterHeight);
  console.log(bmi);

  if (bmi < 18.5) return "Insufficient weight";
  else if (bmi <= 25) return "Normal weight";
  else if (bmi <= 30) return "Overweight";
  else return "Obese";
};

if (require.main === module) {
  try {
    const inputs: number[] = parseBmiInput(process.argv);
    console.log(calculateBmi(inputs[0], inputs[1]));
  } catch (error: unknown) {
    let errorMessage = "An error happened.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
  }
}
