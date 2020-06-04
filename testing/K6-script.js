import http from "k6/http";
import { check, sleep } from "k6";
export let options = {
  stages: [
    { duration: '10s', target: 50 },
    { duration: '10s', target: 100 },
    { duration: '15s', target: 500 },
    { duration: '10s', target: 100 },
    { duration: '10s', target: 10 },
    { duration: '5s', target: 10 },
  ],
};
export default function() {
  let res = http.get(`http://localhost:3000/related_tracks/random`);
  check(res, {
    "status 200": (r) => r.status == 200,
    "request duration within acceptable limits": (r) => r.timings.duration < 2000
  });
};