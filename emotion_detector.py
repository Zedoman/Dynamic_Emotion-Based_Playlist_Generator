import cv2
from deepface import DeepFace

def detect_emotion(frame):
    """
    Detect emotion from a video frame.
    """
    try:
        result = DeepFace.analyze(frame, actions=['emotion'], enforce_detection=False)
        return result['dominant_emotion']
    except Exception as e:
        return "Neutral"  # Default to neutral if detection fails

if __name__ == "__main__":
    cap = cv2.VideoCapture(0)

    while True:
        ret, frame = cap.read()
        if not ret:
            break
        
        emotion = detect_emotion(frame)
        print(f"Detected Emotion: {emotion}")
        
        cv2.putText(frame, f"Emotion: {emotion}", (10, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2)
        cv2.imshow("Emotion Detector", frame)
        
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()
