import patientsData from "../../data/patients";
import { Entry, NewEntry, NewPatient, Patient, SsnlessPatient } from "../types";
import { v4 as uuidv4 } from "uuid";

const patients: Patient[] = patientsData;

const getEntries = (): Patient[] => {
  return patients;
};

const getNonSensitiveEntries = (): SsnlessPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    gender,
    dateOfBirth,
    occupation,
  }));
};

const AddPatient = (newPatient: NewPatient): Patient => {
  const patient: Patient = { ...newPatient, id: uuidv4() };

  patients.push(patient);
  return patient;
};

const getPatient = (id: string): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);

  return patient;
};

const addEntryToPatient = (patientId: string, newEntry: NewEntry): Entry => {
  const patient = patients.find((p) => p.id === patientId);

  if (!patient) {
    throw new Error(`Patient with id ${patientId} was not found.`);
  }
  const entry: Entry = { ...newEntry, id: uuidv4() };
  patient.entries = patient.entries.concat(entry);
  return entry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  AddPatient,
  getPatient,
  addEntryToPatient,
};
