import express from "express";

export enum DBField {
  MESSAGES = "messages",
}

export enum METHOD {
  GET = "get",
  POST = "post",
  PUT = "put",
  DELETE = "delete",
}

export interface CustomRoute {
  method: METHOD;
  route: string;
  handler: (req: express.Request, res: express.Response) => void;
}

export interface Message {
  id: string;
  text: string;
  deadLine: number;
}
