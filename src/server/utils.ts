import { z } from "zod";
import { vector } from "../types/zod";

export const events = {
  chat: {
    send: z.string(),
  },
  room: {
    join: z.string(),
    move: z.union([vector, z.object({ id: z.string() })]),
  },
  attack: {
    move: z.object({
      id: z.string(),
      angle: z.number(),
      position: vector
    })}
} as const;
