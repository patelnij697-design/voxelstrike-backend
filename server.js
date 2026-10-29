const express = require('express');
const cors = require('cors');
const Pusher = require('pusher');

const app = express();
app.use(cors({ origin: "*" })); 
app.use(express.json());

// Initialize Your Private Pusher Administration Wrapper
const pusher = new Pusher({
  appId: "2206073",
  key: "9ca9a4faf91d326a564",
  secret: "7706db854b14d26459bd",
  cluster: "us2",
  useTLS: true
});

// Homepage link to let Render know the container is healthy
app.get('/', (req, res) => {
  res.send('Voxelstrike Multiplayer Backend Engine Status: Active');
});

// Secure endpoint for your Base44 frontend to sync coordinates
app.post('/api/sync-game', (req, res) => {
  const { eventName, channelName, data } = req.body;

  pusher.trigger(channelName, eventName, data)
    .then(() => res.status(200).json({ success: true }))
    .catch((err) => {
      console.error("Pusher Routing Error:", err);
      res.status(500).json({ error: err.message });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server live on port ${PORT}`));
