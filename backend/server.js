const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Enable CORS for all requests
app.use(cors());

// Serve static files from 'videos' folder
app.use("/videos", express.static(path.join(__dirname, "videos")));

// Route to stream video
app.get("/stream/:videoName", (req, res) => {
  const videoPath = path.join(__dirname, "videos", req.params.videoName);
    // Check if the file exists
    if (!fs.existsSync(videoPath)) {
        return res.status(404).json({ error: "Video not found" });
      }
    
      const stat = fs.statSync(videoPath);
      const fileSize = stat.size;
      const range = req.headers.range;
    
      if (range) {
        // Parse range header
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunkSize = end - start + 1;
    
        const fileStream = fs.createReadStream(videoPath, { start, end });
    
        res.writeHead(206, {
          "Content-Range": `bytes ${start}-${end}/${fileSize}`,
          "Accept-Ranges": "bytes",
          "Content-Length": chunkSize,
          "Content-Type": "video/mp4",
        });
    
        fileStream.pipe(res);
      } else {
        res.writeHead(200, {
          "Content-Length": fileSize,
          "Content-Type": "video/mp4",
        });
    
        fs.createReadStream(videoPath).pipe(res);
      }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
