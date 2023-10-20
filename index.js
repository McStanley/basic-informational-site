const http = require('http');
const fs = require('fs/promises');
const path = require('path');

const PORT = 8080;
const PUBLIC_DIR = path.join(__dirname, 'public');

const server = http.createServer((req, res) => {
  const filename = req.url.slice(1) || 'index';
  const filepath = path.join(PUBLIC_DIR, `${filename}.html`);

  fs.readFile(filepath, { encoding: 'utf-8' })
    .then((content) => {
      res.setHeader('Content-Type', 'text/html');
      res.statusCode = 200;
      res.end(content);
    })
    .catch((error) => {
      if (error.code === 'ENOENT') {
        fs.readFile(path.join(PUBLIC_DIR, '404.html'), { encoding: 'utf-8' })
          .then((content) => {
            res.setHeader('Content-Type', 'text/html');
            res.statusCode = 404;
            res.end(content);
          })
          .catch((error) => {
            res.statusCode = 500;
            res.end(`Server error: ${error.code}`);
          });
      } else {
        res.statusCode = 500;
        res.end(`Server error: ${error.code}`);
      }
    });
});

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
