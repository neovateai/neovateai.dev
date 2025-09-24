import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { DEFAULT_PORT } from './constants';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const port = process.env.PORT || DEFAULT_PORT;

// Add cache headers for .js and .css files
app.use((req, res, next) => {
  if (req.url.endsWith('.js') || req.url.endsWith('.css')) {
    res.setHeader('Cache-Control', 'public, max-age=31536000'); // 1 year
    res.setHeader('Expires', new Date(Date.now() + 31536000000).toUTCString());
  }
  next();
});

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '..', 'public')));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
