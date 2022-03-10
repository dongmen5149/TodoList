import { useState, useEffect, useRef } from "react";
import MsgItem from "./MsgItem";
import MsgInput from "./MsgInput";
import fetcher from "../fetcher";
import { METHOD, Message } from "../types";

const MsgList = ({ smsgs }: { smsgs: Message[] }) => {
  const [msgs, setMsgs] = useState<Message[]>(smsgs);
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchMoreEl = useRef<HTMLDivElement>(null);

  const onCreate = async (text: string, id?: string, deadLine?: number) => {
    const newMsg: Message = await fetcher(METHOD.POST, "/messages", {
      text,
      deadLine,
    });
    if (!newMsg) throw Error("something wrong");
    setMsgs((msgs) => [newMsg, ...msgs]);
  };

  const onUpdate = async (text: string, id?: string, deadLine?: number) => {
    const newMsg: Message = await fetcher(METHOD.PUT, `/messages/${id}`, {
      text,
      deadLine,
    });
    if (!newMsg) throw Error("something wrong");
    setMsgs((msgs) => {
      const targetIndex = msgs.findIndex((msg) => msg.id === id);
      if (targetIndex < 0) return msgs;
      const newMsgs = [...msgs];
      newMsgs.splice(targetIndex, 1, newMsg);
      return newMsgs;
    });
    doneEdit();
  };

  const onDelete = async (id: string) => {
    const receivedId: string = await fetcher(METHOD.DELETE, `/messages/${id}`, {
      params: { id },
    });
    setMsgs((msgs) => {
      const targetIndex = msgs.findIndex((msg) => msg.id === receivedId + "");
      if (targetIndex < 0) return msgs;
      const newMsgs = [...msgs];
      newMsgs.splice(targetIndex, 1);
      return newMsgs;
    });
  };

  const doneEdit = () => setEditingId(null);

  const getMessages = async () => {
    const msgs: Message[] = await fetcher(METHOD.GET, "/messages");
    setMsgs(msgs);
  };

  useEffect(() => {
    getMessages();
  }, []);

  console.log("render");

  return (
    <>
      <MsgInput mutate={onCreate} text={""} deadLine={0} />
      <ul className="messages">
        {msgs.map((x) => (
          <MsgItem
            key={x.id}
            {...x}
            onUpdate={onUpdate}
            onDelete={() => onDelete(x.id)}
            startEdit={() => setEditingId(x.id)}
            isEditing={editingId === x.id}
          />
        ))}
      </ul>
      <div ref={fetchMoreEl} />
    </>
  );
};

export default MsgList;
