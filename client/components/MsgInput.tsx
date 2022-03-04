import { FormEvent, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MsgInput = ({
  mutate,
  text = "",
  id = undefined,
  deadLine = 0,
}: {
  mutate: (text: string, id?: string, deadLine?: number) => void;
  text: string;
  id?: string;
  deadLine: number;
}) => {
  const [deadLinePick, setDeadLinePick] = useState<Date>(new Date());
  const textRef = useRef<HTMLInputElement>(null);

  // const dateToString = (deadLine: Date) => {
  //   return (
  //     deadLine.getFullYear() +
  //     (deadLine.getMonth() + 1).toString().padStart(2, "0") +
  //     deadLine.getDate().toString().padStart(2, "0")
  //   );
  // };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!textRef.current) return;
    const text = textRef.current.value;
    textRef.current.value = "";
    mutate(text, id, +deadLinePick);
  };
  return (
    <form className="messages__input" onSubmit={onSubmit}>
      <input
        ref={textRef}
        defaultValue={text}
        placeholder="Please enter your to-do"
      />
      <DatePicker
        className="DatePicker"
        dateFormat={"yyyy/MM/dd"}
        selected={deadLinePick}
        onChange={(date: Date) => setDeadLinePick(date)}
        minDate={new Date()}
      />
      <button type="submit">완료</button>
    </form>
  );
};

export default MsgInput;
