import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  if (req.url !== "/") {
    res.writeHead(404);
    return res.end("Not found");
  }

  const filePath = path.join(__dirname, "frontend", "index.html");

  fs.readFile(filePath, "utf8", (err, html) => {
    if (err) {
      res.writeHead(500);
      return res.end("Error loading HTML");
    }

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(html);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
