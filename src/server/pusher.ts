import Pusher from "pusher-js";

var pusher = new Pusher(process.env.PUSHER_APP_ID, {
  cluster: process.env.PUSHER_CLUSTER,
});
