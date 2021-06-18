const http = require("http")
const fs = require("fs")
const path = require("path")

const app = http.createServer((req, res) => {
    res.writeHead(200, {
        'content-type': 'text/html'
    })
    let contentType = 'text/html';
    let filePath = path.join(__dirname, 'Pages', req.url === '/' ? 'index.html' : req.url);
    const ext = path.extname(filePath);
    if (!ext) {
        filePath += '.html';
    }
    switch (ext) {
        case '.js':
            contentType = "text/javascript"
            break;
        case '.css':
            contentType = "text/css"
            break;
        default:
            contentType = "text/html"
    }
    fs.readFile(filePath,(err, data) => {
        if(err) {
            fs.readFile(path.join(__dirname, 'Pages', 'error.html'), (err, data) => {
                if (err) {
                    res.writeHead(500);
                    throw err;
                }
                else {
                    res.writeHead(404,{'content-type': contentType});
                    res.end(data);
                }
            })
        }
        else {
            res.writeHead(200, { 'content-type': contentType });
            res.end(data);
        }
    })
})
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Listening from port ", PORT)
})