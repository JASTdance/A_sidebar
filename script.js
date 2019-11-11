import http from "k6/http";
import { check, sleep } from "k6";
export let options = {
  vus: 1000,
  duration: "30s"
};
export default function() {
  var randomID = Math.ceil(Math.random() * Math.floor(10000000));
  let res = http.get(`http://localhost:3131/?song_id=${randomID}`);
  check(res, {
    "success": (r) => r.status == 200
  });
};