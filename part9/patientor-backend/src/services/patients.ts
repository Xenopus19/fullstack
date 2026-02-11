import patientsData from "../../data/patients"
import { NewPatient, Patient, SsnlessPatient } from "../types"
import { v4 as uuidv4 } from 'uuid';

const patients: Patient[] = patientsData

const getEntries = (): Patient[] => {
    return patients
}

const getNonSensitiveEntries = (): SsnlessPatient[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        gender,
        dateOfBirth,
        occupation
    }))
}

const AddPatient = (newPatient : NewPatient): Patient => {
    const patient: Patient = {...newPatient, id:uuidv4()}

    patients.push(patient)
    return(patient)
}

export default {getEntries, getNonSensitiveEntries, AddPatient}
