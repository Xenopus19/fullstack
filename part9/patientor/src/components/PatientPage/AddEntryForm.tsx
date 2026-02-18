import { ReactNode, SyntheticEvent, useState } from "react";
import {
  Diagnosis,
  Entry,
  HealthCheckRating,
  NewBaseEntry,
  NewEntry,
} from "../../types";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import patients from "../../services/patients";

interface AddEntryFormProps {
  addEntry: (newEntry: NewEntry) => void;
}

const AddEntryForm = ({ addEntry }: AddEntryFormProps) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<
    Array<Diagnosis["code"]>
  >([]);
  const [diagnosisCode, setDiagnosisCode] = useState("");

  const [type, setType] = useState("HealthCheck");

  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(
    HealthCheckRating.Healthy,
  );

  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");

  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState("");
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState("");

  const getTypeSpecificFields = (): ReactNode => {
    switch (type) {
      case "HealthCheck":
        return (
          <>
            <input
              type="number"
              placeholder="HealthCheckRating"
              value={healthCheckRating}
              onChange={({ target }) => {
                const value = Number(target.value);
                if (value in HealthCheckRating) {
                  setHealthCheckRating(value);
                }
              }}
            ></input>
          </>
        );
      case "Hospital":
        return (
          <>
            <input
              placeholder="DischargeDate"
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)}
            ></input>
            <input
              placeholder="DischargeCriteria"
              value={dischargeCriteria}
              onChange={({ target }) => setDischargeCriteria(target.value)}
            ></input>
          </>
        );
      case "OccupationalHealthcare":
        return (
          <>
            <input
              placeholder="EmployerName"
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
            ></input>
            <input
              type="date"
              placeholder="SickLeaveStart"
              value={sickLeaveStartDate}
              onChange={({ target }) => setSickLeaveStartDate(target.value)}
            ></input>
            <input
              type="date"
              placeholder="SickLeaveEnd"
              value={sickLeaveEndDate}
              onChange={({ target }) => setSickLeaveEndDate(target.value)}
            ></input>
          </>
        );
      default:
        return;
    }
  };

  const onAddEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    const newBase: NewBaseEntry = {
      description,
      date,
      specialist,
      diagnosisCodes: diagnosisCodes.length > 0 ? diagnosisCodes : undefined,
    };

    let newEntry: NewEntry;

    switch (type) {
      case "HealthCheck":
        newEntry = {
          ...newBase,
          type: "HealthCheck",
          healthCheckRating,
        };
        break;

      case "Hospital":
        newEntry = {
          ...newBase,
          type: "Hospital",
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
        };
        break;

      case "OccupationalHealthcare":
        newEntry = {
          ...newBase,
          type: "OccupationalHealthcare",
          employerName: employerName,
        };

        if (sickLeaveStartDate !== "" && sickLeaveEndDate !== "") {
          newEntry.sickLeave = {
            startDate: sickLeaveStartDate,
            endDate: sickLeaveEndDate,
          };
        }
        break;

      default:
        throw new Error("Unknown entry type");
    }

    addEntry(newEntry);
  };
  return (
    <div
      style={{
        border: "2px dashed #646cff",
        padding: "15px",
        borderRadius: "8px",
        marginBottom: "20px",
      }}
    >
      <Typography variant="h6">New Entry</Typography>

      <form onSubmit={onAddEntry}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Entry Type</InputLabel>
          <Select
            value={type}
            label="Entry Type"
            onChange={({ target }) => setType(target.value)}
          >
            <MenuItem value="HealthCheck">Health Check</MenuItem>
            <MenuItem value="Hospital">Hospital</MenuItem>
            <MenuItem value="OccupationalHealthcare">
              Occupational Healthcare
            </MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="Description"
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          margin="normal"
        />
        {diagnosisCodes.map((d) => {
          return (
            <Typography key={d} variant="h6">
              {d}
            </Typography>
          );
        })}
        <TextField
          fullWidth
          label="Diagnosis"
          value={diagnosisCode}
          onChange={({ target }) => setDiagnosisCode(target.value)}
          margin="normal"
        />
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            if (diagnosisCode === "") return;

            setDiagnosisCodes(diagnosisCodes.concat(diagnosisCode));
            setDiagnosisCode("");
          }}
        >
          Add Diagnosis Code
        </Button>
        <TextField
          fullWidth
          type="date"
          label="Date"
          InputLabelProps={{ shrink: true }}
          value={date}
          onChange={({ target }) => setDate(target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Specialist"
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
          margin="normal"
        />

        {getTypeSpecificFields()}

        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button color="primary" variant="contained" type="submit">
            Add Entry
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddEntryForm;
