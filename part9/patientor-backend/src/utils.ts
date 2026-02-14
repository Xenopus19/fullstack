import { Entry, Gender, NewPatient } from "./types"
import z from 'zod'

const newBaseEntrySchema = z.object({
  description: z.string(),
  date: z.string(), 
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
});

const DischargeSchema = z.object({
  date: z.string(), 
  criteria: z.string(),
});

const SickLeaveSchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
});

const HealthCheckEntrySchema = newBaseEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.nativeEnum({
    Healthy: 0,
    LowRisk: 1,
    HighRisk: 2,
    CriticalRisk: 3,
  }),
});

const HospitalEntrySchema = newBaseEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: DischargeSchema,
});

const OccupationalHealthcareEntrySchema = newBaseEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: SickLeaveSchema.optional(),
});

export const newEntrySchema = z.discriminatedUnion("type", [
  HealthCheckEntrySchema,
  HospitalEntrySchema,
  OccupationalHealthcareEntrySchema,
]);

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

    if('entries' in object && 'name' in object && 'gender' in object && 'dateOfBirth' in object && 'occupation' in object && 'ssn' in object)
    {
        const newPatient: NewPatient = {
            name: parseName(object.name),
            dateOfBirth: parseDateOfBirth(object.dateOfBirth),
            occupation: parseOccupation(object.occupation),
            ssn: parseSsn(object.ssn),
            gender: parseGender(object.gender),
            entries: object.entries as Entry[]
        }

        return newPatient
    }
    
    throw new Error('Incorrect data type')
}