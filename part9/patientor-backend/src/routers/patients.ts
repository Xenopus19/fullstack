import express, { Request, Response, NextFunction } from "express"; // Add these imports
import patientsService from "../services/patients";
import { Entry, NewEntry as NewEntry, NewPatient, Patient } from "../types";
import { newEntrySchema, newPatientSchema } from "../utils";
import z from "zod";
import { error } from "node:console";

const patientsRouter = express.Router();

patientsRouter.get("/", (_req, res) => {
  return res.json(patientsService.getNonSensitiveEntries());
});

patientsRouter.get("/:id", (req, res) => {
  const id: string = req.params.id;

  const patient = patientsService.getPatient(id);

  if (!patient) {
    return res
      .status(404)
      .json({ error: `Patient with id ${id} was not found.` });
  }
  return res.json(patient);
});

const newEntryParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    newEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

patientsRouter.post("/:id/entries", (req, res) => {
  const patientId = req.params.id;

  if (typeof patientId !== "string") {
    return res.status(400).json({ error: "Not valid id format." });
  }

  try {
    const newEntry: NewEntry = newEntrySchema.parse(req.body);
    const entry: Entry = patientsService.addEntryToPatient(patientId, newEntry)
    
    res.status(200).json(entry)
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else if(error instanceof Error){
      res.status(400).send({ error: error.message });
    }
  }
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    newPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

patientsRouter.post(
  "/",
  newPatientParser,
  (req: Request<unknown, unknown, NewPatient>, res) => {
    try {
      const newPatient: NewPatient = req.body;
      const patient: Patient = patientsService.AddPatient(newPatient);

      res.json(patient);
    } catch (error: unknown) {
      let errorMessage: string = "An error occured: ";
      if (error instanceof Error) {
        errorMessage.concat(error.message);
      }
      res.status(404).json({ error: errorMessage });
    }
  },
);

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

patientsRouter.use(errorMiddleware);

export default patientsRouter;
