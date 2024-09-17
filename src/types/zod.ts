import { z } from "zod";

const uuid = z.string().uuid();
export type UuidSchema = z.infer<typeof uuid>;
