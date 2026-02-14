import { useEffect, useState } from "react";
import "./App.css";
import type { DiaryEntry, NewDiaryEntry } from "./types";
import diaryService from "./services/diaryService";
import DiaryList from "./components/DiaryList";
import NewDiaryForm from "./components/NewDiaryForm";
import Message, { type MessageProps } from "./components/Message";
import axios from "axios";
import { emptyMessage } from "./constants";

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [message, setMessage] = useState<MessageProps>(emptyMessage);

  useEffect(() => {
    const loadDiaries = async () => {
      const newDiaries: DiaryEntry[] = await diaryService.getAll();
      setDiaries(newDiaries);
    };
    loadDiaries();
  }, []);

  const createDiary = async (newDiary: NewDiaryEntry) => {
    try {
      const diary: DiaryEntry = await diaryService.addNew(newDiary);
      setDiaries(diaries.concat(diary));
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const serverMessage = error.response?.data;
        const errorMessage =
          typeof serverMessage === "string" ? serverMessage : error.message;

        makeMessage({ message: errorMessage, isError: true });
      } else {
        makeMessage({ message: "An unexpected error occurred", isError: true });
      }
    }
  };

  const makeMessage = (messageData: MessageProps) => {
    setMessage(messageData);
    setTimeout(() => setMessage(emptyMessage), 5000);
  };

  return (
    <>
      <Message message={message.message} isError={message.isError} />
      <NewDiaryForm setMessage={makeMessage} createDiary={createDiary} />
      <DiaryList diaries={diaries} />
    </>
  );
}

export default App;
