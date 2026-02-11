import { Gender, NewPatient } from "./types"
import z from 'zod'

export const newPatientSchema = z.object({
  name: z.string(),
  gender: z.nativeEnum(Gender),
  dateOfBirth: z.string().date(),
  occupation: z.string(),
  ssn: z.string()
});

const isString = (object: unknown): object is string => {
    return typeof object === 'string' || object instanceof String
}

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
      throw new Error('Incorrect or missing name: ' + name);
  }
  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDateOfBirth = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
      throw new Error('Incorrect or missing occupation: ' + occupation);
  }
  return occupation;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
      throw new Error('Incorrect or missing ssn: ' + ssn);
  }
  return ssn;
};

const isGender = (object: unknown): object is Gender => {
    return Object.values(Gender).includes(object as Gender);
}

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
      throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

export const createNewPatient = (object: unknown): NewPatient => {
    if(!object || typeof object !== 'object')
    {
        throw new Error('Data incorrect or missing')
    }

    if('name' in object && 'gender' in object && 'dateOfBirth' in object && 'occupation' in object && 'ssn' in object)
    {
        const newPatient: NewPatient = {
            name: parseName(object.name),
            dateOfBirth: parseDateOfBirth(object.dateOfBirth),
            occupation: parseOccupation(object.occupation),
            ssn: parseSsn(object.ssn),
            gender: parseGender(object.gender)
        }

        return newPatient
    }
    
    throw new Error('Incorrect data type')
}