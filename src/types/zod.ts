import { z } from "zod";

const uuid = z.string().uuid();
export type UuidSchema = z.infer<typeof uuid>;

///  Type that represents a range from 0 to N
export type Range<N extends number, Result extends number[] = []> =
  Result['length'] extends N ? Result[number] : Range<N, [...Result, Result['length']]>;
