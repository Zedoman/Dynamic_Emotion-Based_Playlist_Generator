import sys
import json
import spotipy
from spotipy.oauth2 import SpotifyOAuth

def generate_playlist(emotion, tracks):
    """
    Generate a playlist based on the detected emotion.
    """
    filtered_tracks = [track for track in tracks if emotion in track.get('tags', [])]
    sorted_tracks = sorted(filtered_tracks, key=lambda x: x.get('popularity', 0), reverse=True)
    return sorted_tracks[:10]

if __name__ == "__main__":
    # Simulate inputs (Replace with CLI arguments in real use)
    emotion = sys.argv[1] if len(sys.argv) > 1 else "Happy"
    tracks = json.loads(sys.argv[2]) if len(sys.argv) > 2 else []

    playlist = generate_playlist(emotion, tracks)
    print(json.dumps(playlist))
