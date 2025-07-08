# 🛡️ Real-Time Helmet and Mask Detection at ATMs using YOLOv8

An AI-powered surveillance system that enhances ATM security by detecting individuals wearing helmets or masks in real time. Built with a custom YOLOv8 model and integrated with a web interface using Flask, this project aims to prevent ATM misuse by enforcing visible face policies before allowing transactions.

---

## 📌 Abstract

Automated Teller Machines (ATMs) are frequently targeted by criminals who obscure their identity using face coverings. Traditional surveillance systems lack real-time enforcement, allowing offenders to bypass security. This project proposes a real-time helmet and mask detection system using a **custom-trained YOLOv8 model**, designed to restrict ATM access if a user's face is not clearly visible.

The system integrates with ATM transaction workflows, actively denying masked/helmeted users and triggering alerts when necessary. Trained on a custom dataset and fine-tuned for real-time deployment, the model achieves **>90% mAP@0.5** and can run efficiently on edge devices. The frontend is developed using **HTML, CSS, and JavaScript**, while **Flask** handles the backend logic.

---

## 🎯 Objectives

- ✅ Detect helmets and masks in real-time from camera feed (>30 FPS).
- ✅ Block transactions if the user’s face is obscured.
- ✅ Achieve ≥90% detection accuracy in various lighting conditions.
- ✅ Ensure fast processing (<500ms delay).
- ✅ Support low-power edge device deployment (Jetson Nano, Raspberry Pi).
- ✅ Design a centralized monitoring system for multiple ATMs.
- ✅ Provide override features for exempt users (e.g., medical masks).
- ✅ Integrate with banking APIs for real-time alerts.

---

## 🛠️ Technologies Used

| Component     | Technology |
|---------------|------------|
| Object Detection | YOLOv8 (Ultralytics) |
| Labeling Tool | LabelImg |
| Training Platform | Google Colab (GPU) |
| Backend | Python, Flask |
| Frontend | HTML, CSS, JavaScript |
| Video Stream & Processing | OpenCV |
| Alert System | Audio/Visual (via Flask routes) |

---

## 🧱 Architecture

1. **User Approaches ATM**
2. **Live Camera Feed Captured via OpenCV**
3. **YOLOv8 Model Performs Real-Time Detection**
4. **If Face Is Covered → Transaction Blocked**
5. **Trigger Alert → Display Message or Sound**
6. **Else → Allow Transaction**

---

## 🖥️ Screenshots

20250705-1059-00.4306503.mp4

---

## 🔧 Setup Instructions

### 🔹 1. Clone the Repository

```bash
git clone https://github.com/pravigowda18/yolo-atm-security.git
cd yolo-atm-security
