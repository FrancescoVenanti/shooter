import { z } from "zod";
import { vector } from "../types/zod";

const playerInformation = z.object({
  id: z.string({ required_error: "id is required" }),
  name: z.string({ required_error: "name is required" }),
  character: z.string({ required_error: "character is required" }),
  position: vector,
});

export const events = {
  chat: {
    send: z.string(),
  },
  room: {
    join: playerInformation,
    receiveEnemies: z.array(playerInformation),
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
