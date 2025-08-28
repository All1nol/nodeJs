import { createServer } from "node:http";
import { readFileSync } from "node:fs";

const server = createServer();

server.on("request", (request, response) => {
  const result = readFileSync("./text.txt");

  response.setHeader("Content-Type", "text/plain");

  response.end(result);
});

server.listen(4080, "10.81.3.12", () => {
  console.log("Server has started on:", server.address());
});
