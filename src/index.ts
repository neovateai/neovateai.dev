import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { DEFAULT_PORT } from "./constants";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const port = process.env.PORT || DEFAULT_PORT;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "..", "public")));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log("Hello World");
});
