import { z } from "zod";

const uuid = z.string().uuid();
export type UuidSchema = z.infer<typeof uuid>;
export const vector = z.object({
  x: z.number({ required_error: "x is required" }),
  y: z.number({ required_error: "y is required" }),
  angle: z.number(),
});
///  Type that represents a range from 0 to N
export type Range<N extends number, Result extends number[] = []> =
  Result['length'] extends N ? Result[number] : Range<N, [...Result, Result['length']]>;
