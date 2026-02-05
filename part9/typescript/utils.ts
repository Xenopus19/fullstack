export const parseNumber = (value: string): number => {
  if (!isNaN(Number(value))) {
    return Number(value);
  } else {
    throw new Error("Provided value is not number!");
  }
};




