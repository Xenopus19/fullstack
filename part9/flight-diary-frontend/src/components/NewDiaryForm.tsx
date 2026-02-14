import { useState } from "react";
import { Visibility, Weather, type NewDiaryEntry } from "../types";
import z from "zod";
import { ZodError } from "zod";
import type { MessageProps } from "./Message";

interface NewDiaryFormProps {
  createDiary: (newDiary: NewDiaryEntry) => void;
  setMessage: (message: MessageProps) => void;
}
const NewDiaryForm = ({ createDiary, setMessage }: NewDiaryFormProps) => {
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState(Object.values(Weather)[0]);
  const [visibility, setVisibility] = useState(Object.values(Visibility)[0]);
  const [comment, setComment] = useState("");

  const handleCreateDiary = (event: React.SyntheticEvent) => {
    event.preventDefault();

    try {
      const newDiary: NewDiaryEntry = {
        weather,
        comment,
        visibility: z.nativeEnum(Visibility).parse(visibility),
        date,
      };

      createDiary(newDiary);

      setComment("");
      setDate("");
      setVisibility(Object.values(Visibility)[0]);
      setWeather(Object.values(Weather)[0]);
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        setMessage({ message: error.message, isError: true });
      }
    }
  };
  return (
    <div>
      <form onSubmit={handleCreateDiary}>
        <input
          type="date"
          placeholder="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        ></input>
        <input
          placeholder="comment"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        ></input>
        <div>
          <strong>Weather</strong>
          {Object.values(Weather).map((w) => {
            return (
              <label key={w}>
                {w}
                <input
                  type="radio"
                  name="weather"
                  checked={weather === w}
                  value={weather}
                  onChange={() => setWeather(w)}
                ></input>
              </label>
            );
          })}
        </div>
        <div>
          <strong>Visibility</strong>
          {Object.values(Visibility).map((v) => {
            return (
              <label key={v}>
                {v}
                <input
                  type="radio"
                  name="visibility"
                  checked={visibility === v}
                  value={visibility}
                  onChange={() => setVisibility(v)}
                ></input>
              </label>
            );
          })}
        </div>

        <br />
        <button type="submit">Create diary</button>
      </form>
    </div>
  );
};

export default NewDiaryForm;
