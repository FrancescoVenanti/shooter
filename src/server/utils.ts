import { z } from "zod";
import { vector } from "../types/zod";

export const events = {
  chat: {
    send: z.string(),
  },
  room: {
    join: z.string(),
    move: vector.merge(z.object({ id: z.string() })),
  },
  attack: {
    move: z.object({
      id: z.string(),
      angle: z.number(),
      position: vector
    })}
} as const;
