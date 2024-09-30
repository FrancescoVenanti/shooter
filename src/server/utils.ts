import { z } from "zod";
import { vector } from "../types/zod";

const playerInformation = z.object({
  id: z.string(),
  name: z.string(),
  character: z.string(),
  position: vector,
});

export const events = {
  chat: {
    send: z.string(),
  },
  room: {
    join: playerInformation,
    move: vector.merge(z.object({ id: z.string() })),
  },
  attack: {
    move: z.object({
      id: z.string(),
      angle: z.number(),
      position: vector,
    }),
  },
} as const;
