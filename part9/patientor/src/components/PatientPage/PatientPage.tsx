import { ReactNode, useContext, useEffect, useState } from "react";
import { useMatch } from "react-router-dom";
import { Diagnosis, NewEntry, Patient } from "../../types";
import patients from "../../services/patients";
import { Divider, Typography } from "@mui/material";
import ManIcon from "@mui/icons-material/Man";
import WomanIcon from "@mui/icons-material/Woman";
import FlareIcon from "@mui/icons-material/Flare";
import EntryCard from "./EntryCard";
import AddEntryForm from "./AddEntryForm";
import { MessageContext } from "../../context";
import axios, { isAxiosError } from "axios";

const PatientPage = () => {
  const match = useMatch("/patients/:id");
  const [patient, setPatient] = useState<Patient>();
  const id = match?.params?.id;
  const { setMessage } = useContext(MessageContext);

  useEffect(() => {
    const getPatient = async () => {
      if (!id) return;
      try {
        const p = await patients.getOne(id);
        setPatient(p);
      } catch (error: unknown) {
        console.log(error);
      }
    };
    getPatient();
  }, []);

  if (!match || !match.params.id || !patient)
    return <h3>Patient id missing</h3>;

  const getGenderIcon = (): ReactNode => {
    switch (patient.gender) {
      case "female":
        return <WomanIcon />;
      case "male":
        return <ManIcon />;
      case "other":
        return <FlareIcon />;
    }
  };

  const addNewEntry = (newEntry: NewEntry) => {
    patients
      .addEntry(patient.id, newEntry)
      .then((entry) =>
        setPatient({ ...patient, entries: patient.entries.concat(entry) }),
      )
      .catch((error: unknown) => {
        if (axios.isAxiosError(error)) {
          const serverMessage = error.response?.data;
          const errorMessage =
            typeof serverMessage === "string" ? serverMessage : error.message;

          setMessage(errorMessage);
        } else {
          setMessage("An unexpected error occurred",);
        }
      });
  };

  return (
    <div>
      <Typography variant="h5" style={{ margin: "0.5em" }}>
        {patient.name}
      </Typography>
      {getGenderIcon()}
      <Divider hidden />
      <Typography variant="body1" style={{ margin: "0.5em" }}>
        ssn: {patient.ssn}
      </Typography>
      <Typography variant="body1" style={{ margin: "0.5em" }}>
        occupation: {patient.occupation}
      </Typography>
      <Typography variant="h5" style={{ margin: "0.5em" }}>
        Entries:
      </Typography>
      {patient.entries.map((e) => (
        <EntryCard entry={e} key={e.description} />
      ))}
      <AddEntryForm addEntry={addNewEntry} />
    </div>
  );
};

export default PatientPage;
