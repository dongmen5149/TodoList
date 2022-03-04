import MsgInput from "./MsgInput";

const MsgItem = ({
  id,
  deadLine,
  text,
  isEditing,
  onUpdate,
  onDelete,
  startEdit,
}: {
  id: string;
  deadLine: number;
  text: string;
  isEditing: boolean;
  onUpdate: (text: string, id?: string) => void;
  onDelete: () => void;
  startEdit: () => void;
}) => (
  <li className="messages__item">
    <h3>
      {id}{" "}
      <sub>
        DeadLine :{" "}
        {new Date(deadLine).toLocaleString("ko-KR", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })}
      </sub>
    </h3>

    {isEditing ? (
      <>
        <MsgInput mutate={onUpdate} text={text} id={id} deadLine={0} />
      </>
    ) : (
      text
    )}

    <div className="messages__buttons">
      <button onClick={startEdit}>수정</button>
      <button onClick={onDelete}>삭제</button>
    </div>
  </li>
);

export default MsgItem;
