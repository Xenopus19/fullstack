import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from "@mui/material";

import { apiBaseUrl } from "./constants";
import { Diagnosis, DiagnosisContext, Patient } from "./types";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import PatientPage from "./components/PatientPage/PatientPage";
import diagnoseService from "./services/diagnoses";
import { DiagnosesContext, MessageContext } from "./context";
import Message from "./components/Message";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };

    const fetchDiagnosesList = async () => {
      const allDiagnoses = await diagnoseService.getAll();
      setDiagnoses(allDiagnoses);
    };
    void fetchPatientList();
    void fetchDiagnosesList();
  }, []);

  const makeMessage = (message: string) => {
    setMessage(message)
    setTimeout(() => setMessage(''), 3000)
  };

  return (
    <div className="App">
      <MessageContext.Provider value={{ setMessage: makeMessage }}>
        <DiagnosesContext.Provider value={{ diagnoses }}>
          <Router>
            <Container>
              <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
                Patientor
              </Typography>
              <Message message={message}/>
              <Button
                component={Link}
                to="/"
                variant="contained"
                color="primary"
              >
                Home
              </Button>
              <Divider hidden />
              <Routes>
                <Route
                  path="/"
                  element={
                    <PatientListPage
                      patients={patients}
                      setPatients={setPatients}
                    />
                  }
                />
                <Route
                  path="/patients/:id"
                  element={<PatientPage allDiagnoses={diagnoses} />}
                />
              </Routes>
            </Container>
          </Router>
        </DiagnosesContext.Provider>
      </MessageContext.Provider>
    </div>
  );
};

export default App;
