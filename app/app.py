import os
import uuid
import cv2
from flask import Flask, render_template, request, Response
from ultralytics import YOLO
from model_interface import video_detection, web_detection
import model_interface

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'static/videos'

# Global flag to control streaming


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/video')
def video():
    return render_template('video.html')


@app.route('/webcam')
def webcam():
    return render_template('web.html')


@app.route('/upload', methods=['POST'])
def upload():
    if 'video' not in request.files:
        return "No file part", 400

    file = request.files['video']
    if file.filename == '':
        return "No selected file", 400

    viduuid = str(uuid.uuid4())
    filename = viduuid + '.mp4'
    path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(path)

    output_path = video_detection(path)

    if not output_path:
        return "Video processing failed", 500

    output_filename = os.path.basename(output_path)

    return render_template('video.html', output_video=output_filename)



 


@app.route('/video_feed')
def video_feed():
    return Response(web_detection(0), mimetype='multipart/x-mixed-replace; boundary=frame')


@app.route('/start_stream', methods=['POST'])
def start_stream():
    model_interface.streaming = True
    return "Streaming started", 200

@app.route('/stop_stream', methods=['POST'])
def stop_stream():
    model_interface.streaming = False
    return "Streaming stopped", 200

@app.route('/get_class')
def get_class():
    return {'class_id': model_interface.clss}


if __name__ == '__main__':
    app.run(debug=True)
