export enum METHOD {
  GET = "get",
  POST = "post",
  PUT = "put",
  DELETE = "delete",
}

export interface Message {
  id: string;
  deadLine: number;
  text: string;
}

export interface MsgQueryData {
  pages: { messages: Message[] }[];
  pageParams: string;
}
