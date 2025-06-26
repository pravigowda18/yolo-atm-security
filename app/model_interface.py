import cv2
from ultralytics import YOLO

# Load the YOLO model once
model = YOLO("best.pt")  # This should be your trained model path
streaming = False
clss = 0

def web_detection(path_x):
    global streaming, clss
    cap = cv2.VideoCapture(path_x)

    if not cap.isOpened():
        print(f"Error: Cannot open video file {path_x}")
        return

    while streaming:
        success, frame = cap.read()
        if not success:
            print("End of video stream or cannot read frame.")
            break

        # Run YOLO inference
        results = model(frame)

        for result in results:
            boxes = result.boxes
            for box in boxes:
                # Get box coordinates
                x1, y1, x2, y2 = map(int, box.xyxy[0].tolist())
                
                # Get class ID and confidence
                cls_id = int(box.cls[0].item())
                conf = box.conf[0].item()
                clss = cls_id


                # Get class name from model
                class_name = model.names[cls_id] if model.names else str(cls_id)
                print(f"Detected: {class_name} ({conf:.2f})")


                # Draw box and label
                cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 225, 225), 2)
                label = f'{class_name} | {conf:.2f}'
                cv2.putText(frame, label, (x1, y1 - 10),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 2)

        ret, buffer = cv2.imencode('.jpg', frame)
        if not ret:
            continue
        frame_bytes = buffer.tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')

    cap.release()



def video_detection(path_x):
    cap = cv2.VideoCapture(path_x)

    if not cap.isOpened():
        print(f"Error: Cannot open video file {path_x}")
        return None

    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = cap.get(cv2.CAP_PROP_FPS)

    output_path = path_x.replace(".mp4", "_output.mp4")
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    out = cv2.VideoWriter(output_path, fourcc, fps, (width, height))

    while True:
        success, frame = cap.read()
        if not success:
            break

        results = model(frame)

        for result in results:
            boxes = result.boxes
            for box in boxes:
                x1, y1, x2, y2 = map(int, box.xyxy[0].tolist())
                cls_id = int(box.cls[0].item())
                conf = box.conf[0].item()
                class_name = model.names[cls_id] if model.names else str(cls_id)

                cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 225, 225), 2)
                label = f'{class_name} | {conf:.2f}'
                cv2.putText(frame, label, (x1, y1 - 10),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 2)

        out.write(frame)

    cap.release()
    out.release()
    return output_path
