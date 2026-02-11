import express, { Request, Response, NextFunction } from 'express'; // Add these imports
import patientsService from '../services/patients';
import { NewPatient, Patient } from '../types'
import { createNewPatient, newPatientSchema } from '../utils'
import z from 'zod';


const patientsRouter = express.Router()

patientsRouter.get('/', (_req, res) => {
    return res.json(patientsService.getNonSensitiveEntries())
})

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try{
    newPatientSchema.parse(req.body)
    next()
  }
  catch(error: unknown){
    next(error)
  }
}

patientsRouter.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>, res) => {
    try{
        const newPatient: NewPatient = req.body
        const patient: Patient = patientsService.AddPatient(newPatient)

        res.json(patient)
    }
    catch(error:unknown)
    {
        let errorMessage: string = 'An error occured: '
        if(error instanceof Error)
        {
            errorMessage.concat(error.message)
        }
        res.status(404).json({error: errorMessage})
    }
})

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => { 
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

patientsRouter.use(errorMiddleware)

export default patientsRouter