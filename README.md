# Dynamic Emotion-Based Playlist Generator  

A dynamic music recommendation system that adapts playlists based on real-time emotion detection. The application combines emotion analysis using a webcam with playlist generation optimized for mood consistency and user engagement. The project leverages **Daytona Benchmarking** to ensure high performance and scalability.  

---

## Features  

1. **Real-Time Emotion Detection**:  
   - Analyzes webcam feed or device sensor data to detect emotions (e.g., happy, sad, excited, calm).  

2. **Playlist Adaptation**:  
   - Dynamically adjusts playlists based on detected emotions and pre-defined user preferences.  

3. **Emotion Consistency Score**:  
   - Ensures smooth transitions between tracks to maintain the desired emotional flow.  

4. **Daytona Optimization**:  
   - Benchmarks and optimizes the playlist generation algorithm for speed and accuracy.  

---

## Tech Stack  

- **Emotion Detection**: Python, OpenCV, DeepFace  
- **Backend**: Node.js with Express  
- **Music Data**: Spotify API for track metadata and playback  
- **Benchmarking**: Daytona  
- **Frontend**: React with Tailwind CSS  

---

## Installation  

### 1. Clone the Repository  

```bash
git clone https://github.com/Zedoman/Dynamic_Emotion-Based_Playlist_Generator
cd emotion-based-playlist
```

### 2. Backend Setup   

    ```bash
    npm install  

    node server.js   
    ```

### 3. Frontend Setup

```bash
cd Playlist-generator
npm install  


npm start  

```
### 4. Emotion Detection Module
```bash
pip install opencv-python deepface spotipy
```
```bash
python emotion_detector.py
```  

### 5. Daytona Install

### Mac / Linux
```bash
curl -sfL https://download.daytona.io/daytona/install.sh | sudo bash && daytona server -y && daytona
```

# Windows
```bash
$architecture = if ($env:PROCESSOR_ARCHITECTURE -eq "AMD64") { "amd64" } else { "arm64" }
md -Force "$Env:APPDATA\bin\daytona"; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.SecurityProtocolType]'Tls,Tls11,Tls12';
Invoke-WebRequest -URI "https://download.daytona.io/daytona/latest/daytona-windows-$architecture.exe" -OutFile "$Env:APPDATA\bin\daytona\daytona.exe";
$env:Path += ";" + $Env:APPDATA + "\bin\daytona"; [Environment]::SetEnvironmentVariable("Path", $env:Path, [System.EnvironmentVariableTarget]::User);
daytona serve;
```

# Usage
## Emotion Detection
## The emotion detection module uses a webcam to capture video frames and analyze emotions:
```bash
import cv2  
from deepface import DeepFace  

def detect_emotion(frame):  
    result = DeepFace.analyze(frame, actions=['emotion'], enforce_detection=False)  
    return result['dominant_emotion']  

# Example usage with webcam feed:  
cap = cv2.VideoCapture(0)  

while True:  
    ret, frame = cap.read()  
    if not ret:  
        break  

    emotion = detect_emotion(frame)  
    print(f"Detected Emotion: {emotion}")  

    cv2.imshow("Emotion Detector", frame)  
    if cv2.waitKey(1) & 0xFF == ord('q'):  
        break  

cap.release()  
cv2.destroyAllWindows()  
```

### Playlist Generator
### Generates playlists based on the detected emotion:
```bash
import random  

def generate_playlist(emotion, tracks):  
    filtered_tracks = [track for track in tracks if emotion in track['tags']]  
    sorted_tracks = sorted(filtered_tracks, key=lambda x: x['popularity'], reverse=True)  
    return sorted_tracks[:10]  

# Example dataset:  
tracks = [  
    {"name": "Happy Song 1", "tags": ["Happy"], "popularity": 80},  
    {"name": "Calm Song 1", "tags": ["Calm"], "popularity": 75},  
]  
```

### Backend API
### Handles requests for playlist generation:
```bash
const express = require('express');  
const { exec } = require('child_process');  

const app = express();  
app.use(express.json());  

app.post('/playlist', (req, res) => {  
    const { emotion, tracks } = req.body;  
    exec(  
        `python generate_playlist.py --emotion='${emotion}' --tracks='${JSON.stringify(tracks)}'`,  
        (err, stdout) => {  
            if (err) return res.status(500).send(err.message);  
            res.json(JSON.parse(stdout));  
        }  
    );  
});  

app.listen(3000, () => console.log('Server running on port 3000'));  
```

### Frontend
### React-based interface for users to view and interact with playlists:
```bash
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

      const response = await axios.post("http://localhost:3000/playlist", {  
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
```

### Benchmarking with Daytona
### Define test cases for performance evaluation:
```bash
{  
  "test_scenarios": [  
    {  
      "id": "small_playlist",  
      "description": "Small playlist generation",  
      "parameters": {  
        "tracks": 10,  
        "emotion": "Happy"  
      }  
    },  
    {  
      "id": "large_playlist",  
      "description": "Large playlist generation",  
      "parameters": {  
        "tracks": 1000,  
        "emotion": "Calm"  
      }  
    }  
  ],  
  "metrics": ["execution_time", "emotion_consistency_score"]  
}  
```
```bash
daytona run config.json --output results.json  
```
### Deployment
### Frontend: Deploy on Vercel.
### Backend: Use AWS Lambda or DigitalOcean.
### Emotion Detection: Deploy on a GPU-enabled server for real-time performance.


