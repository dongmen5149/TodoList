import { readDB, writeDB } from "../dbController";
import { DBField, CustomRoute, Message, METHOD } from "../types";

const getMsgs = (): Message[] => readDB(DBField.MESSAGES);
const setMsgs = (data: Message[]) => writeDB(DBField.MESSAGES, data);

const messagesRoute: CustomRoute[] = [
  {
    // GET MESSAGES
    method: METHOD.GET,
    route: "/messages",
    handler: ({ query: { cursor = "" } }, res) => {
      const msgs = getMsgs();
      const fromIndex = msgs.findIndex((msg) => msg.id === cursor) + 1;
      res.send(msgs.slice(fromIndex, fromIndex + 15));
    },
  },
  {
    // GET MESSAGE
    method: METHOD.GET,
    route: "/messages/:id",
    handler: ({ params: { id } }, res) => {
      try {
        const msgs = getMsgs();
        const msg = msgs.find((m) => m.id === id);
        if (!msg) throw Error("not found");
        res.send(msg);
      } catch (err) {
        res.status(404).send({ error: err });
      }
    },
  },
  {
    // CREATE MESSAGE
    method: METHOD.POST,
    route: "/messages",
    handler: ({ body }, res) => {
      try {
        const msgs = getMsgs();
        let newId;
        if (msgs.length === 0) {
          newId = 1;
        } else {
          newId = +msgs[0].id + 1;
        }
        const newMsg = {
          id: `${newId}`,
          text: body.text,
          deadLine: body.deadLine,
        };
        msgs.unshift(newMsg);
        setMsgs(msgs);
        res.send(newMsg);
        console.log(body);
      } catch (err) {
        res.status(500).send({ error: err });
      }
    },
  },
  {
    // UPDATE MESSAGE
    method: METHOD.PUT,
    route: "/messages/:id",
    handler: ({ body, params: { id } }, res) => {
      try {
        const msgs = getMsgs();
        const targetIndex = msgs.findIndex((msg) => msg.id === id);
        if (targetIndex < 0) throw "메시지가 없습니다.";
        const newMsg = {
          ...msgs[targetIndex],
          text: body.text,
          deadLine: body.deadLine,
        };
        msgs.splice(targetIndex, 1, newMsg);
        setMsgs(msgs);
        res.send(newMsg);
      } catch (err) {
        res.status(500).send({ error: err });
      }
    },
  },
  {
    // DELETE MESSAGE
    method: METHOD.DELETE,
    route: "/messages/:id",
    handler: ({ params: { id } }, res) => {
      try {
        const msgs = getMsgs();
        const targetIndex = msgs.findIndex((msg) => msg.id === id);
        if (targetIndex < 0) throw "메시지가 없습니다.";
        msgs.splice(targetIndex, 1);
        setMsgs(msgs);
        res.send(id);
      } catch (err) {
        res.status(500).send({ error: err });
      }
    },
  },
];

export default messagesRoute;
