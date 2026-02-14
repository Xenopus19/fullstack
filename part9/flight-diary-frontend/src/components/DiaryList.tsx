import type { DiaryEntry } from "../types";

interface DiaryListProps {
  diaries: DiaryEntry[];
}

const DiaryList = ({ diaries }: DiaryListProps) => {
  return (
    <div>
      {diaries.map((diary) => {
        return (
          <div key={diary.date}>
            <h3>{diary.date}</h3>
            <p>Visibility:{diary.visibility}</p>
            <p>Weather:{diary.weather}</p>
            <i>{diary.comment}</i>
          </div>
        );
      })}
    </div>
  );
};

export default DiaryList;
