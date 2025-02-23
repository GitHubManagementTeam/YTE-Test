const express = require('express');
const ytdl = require('ytdl-core');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

// Get Video URL by ID
app.get('/api/get-video-url', async (req, res) => {
  const videoId = req.query.id;
  if (!videoId) {
    return res.status(400).json({ error: 'No video ID provided' });
  }

  try {
    const info = await ytdl.getInfo(videoId);
    const videoUrl = ytdl.chooseFormat(info.formats, { quality: 'highest' }).url;
    res.json({ url: videoUrl });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch video URL' });
  }
});

// Get MP3 URL by ID
app.get('/api/get-mp3-url', async (req, res) => {
  const videoId = req.query.id;
  if (!videoId) {
    return res.status(400).json({ error: 'No video ID provided' });
  }

  try {
    const info = await ytdl.getInfo(videoId);
    const audioUrl = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' }).url;
    res.json({ url: audioUrl });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch MP3 URL' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
