import { z } from "zod";
import { vector } from "../types/zod";

export const events = {
  chat: {
    send: z.string(),
  },
  room: {
    join: z.string(),
    move: vector
  },

} as const;
