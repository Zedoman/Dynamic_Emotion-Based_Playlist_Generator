const express = require('express');
const { exec } = require('child_process');

const app = express();
app.use(express.json());

app.post('/playlist', (req, res) => {
    const { emotion, tracks } = req.body;
    const tracksJson = JSON.stringify(tracks);

    exec(
        `python generate_playlist.py "${emotion}" '${tracksJson}'`,
        (err, stdout) => {
            if (err) return res.status(500).send(err.message);
            try {
                const playlist = JSON.parse(stdout);
                res.json(playlist);
            } catch (error) {
                res.status(500).send("Error parsing response");
            }
        }
    );
});

app.listen(3000, () => console.log('Server running on port 3000'));
