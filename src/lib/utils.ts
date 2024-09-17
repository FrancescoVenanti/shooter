import { events } from "../server/utils";

export function toSocketKey<
  TChannel extends keyof typeof events,
  TEvent extends keyof (typeof events)[TChannel],
>(
  side: "server" | "client",
  channel: TChannel,
  event: TEvent extends string ? TEvent : never,
): string {
  return `${channel}__${side === "client"
    ? event
    : "on" + event.at(0)?.toUpperCase() + event.substring(1).toLowerCase()
    }`;
}
