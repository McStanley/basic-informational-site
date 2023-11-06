const express = require('express');
const app = express();
const path = require('path');

const PORT = 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

app.get('/', (_req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, 'index.html'));
});

app.get('/about', (_req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, 'about.html'));
});

app.get('/contact-me', (_req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, 'contact-me.html'));
});

app.all('*', (_req, res) => {
  res.status(404).sendFile(path.join(PUBLIC_DIR, '404.html'));
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
