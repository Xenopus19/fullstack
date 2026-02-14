import { Typography } from "@mui/material";
import { Diagnosis, Entry } from "../../types";
import { ReactNode, useContext } from "react";
import { DiagnosesContext } from "../../context";

interface EntryProps {
  entry: Entry;
}

const EntryCard = ({ entry }: EntryProps) => {
  const { diagnoses } = useContext(DiagnosesContext);

  const findDiagnosisNameByCode = (code: string): string => {
    console.log(code);
    const name = diagnoses.find((d) => d.code === code)?.name;
    if (!name) return "";
    return name;
  };

  const styles: React.CSSProperties = {
    padding: "10px",
    border: "2px solid #646cff",
    borderRadius: "12px",
    backgroundColor: "#f9f9f9",
  };

  const renderTypeSpecificData = (): ReactNode => {
    switch (entry.type) {
      case "HealthCheck":
        return (
          <Typography variant="body1">
            Health rating: {entry.healthCheckRating}
          </Typography>
        );
      case "Hospital":
        return (
          <Typography variant="body1">
            Discharge: {entry.discharge.date}{" "}
            {entry.discharge.criteria}
          </Typography>
        );
      case "OccupationalHealthcare":
        return (
          <div>
            <Typography variant="body1">
              Employer name: {entry.employerName}
            </Typography>
            {entry.sickLeave && (
              <Typography variant="body1">
                Start date: {entry.sickLeave.startDate}{" "}
                <br />
                End date: {entry.sickLeave.endDate}
              </Typography>
            )}
          </div>
        );
    }
  };

  return (
    <div style={styles}>
      <Typography variant="body1" style={{ margin: "0.5em" }}>
        {entry.date} {entry.description} Specialist: {entry.specialist}
      </Typography>
      <ul>
        {entry.diagnosisCodes?.map((d) => (
          <li key={d}>
            {d}: {findDiagnosisNameByCode(d)}
          </li>
        ))}
      </ul>
      {renderTypeSpecificData()}
    </div>
  );
};

export default EntryCard;
