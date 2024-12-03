import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [emotion, setEmotion] = useState("Neutral");
  const [playlist, setPlaylist] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPlaylist = async (detectedEmotion) => {
    setLoading(true);
    try {
      const tracks = [
        { name: "Happy Song 1", tags: ["Happy"], popularity: 80 },
        { name: "Sad Song 1", tags: ["Sad"], popularity: 60 },
        { name: "Calm Song 1", tags: ["Calm"], popularity: 75 },
      ];

      const response = await axios.post("http://localhost:5000/playlist", {
        emotion: detectedEmotion,
        tracks,
      });

      setPlaylist(response.data);
    } catch (error) {
      console.error("Error fetching playlist:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaylist(emotion);
  }, [emotion]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Dynamic Playlist Generator</h1>
      <div>
        <p>Detected Emotion: {emotion}</p>
        <button
          onClick={() => setEmotion("Happy")}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Simulate Happy Emotion
        </button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="mt-4">
          {playlist.map((track, index) => (
            <li key={index} className="text-lg">
              {track.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
