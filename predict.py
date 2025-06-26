from ultralytics import YOLO
import time

model = YOLO("helmet_model.pt")

model.predict(
    source=0,
    show=True,
    save=True,
    conf=0.6,
    line_width=2,
    save_crop=False,     # Correct parameter name
    show_conf=True
)

time.sleep(10)


