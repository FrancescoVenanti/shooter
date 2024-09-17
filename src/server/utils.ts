import { z } from "zod";

export const events = {
  chat: {
    send: z.string(),
  },
  room: {
    join: z.string(),
  },
} as const;
