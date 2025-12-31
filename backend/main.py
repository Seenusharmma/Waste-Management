from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from ultralytics import YOLO
import cv2
import numpy as np
import base64
from waste_mapper import get_waste_type

app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the model (will download yolov8n.pt on first run)
model = YOLO("yolov8n.pt") 

@app.get("/")
def read_root():
    return {"message": "Waste Detection API is running"}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    # Read image file
    contents = await file.read()
    nparr = np.frombuffer(contents, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    # Run inference
    results = model(img)
    
    detections = []
    
    for result in results:
        # Process detections
        boxes = result.boxes
        for box in boxes:
            x1, y1, x2, y2 = box.xyxy[0].tolist()
            confidence = box.conf[0].item()
            cls = int(box.cls[0].item())
            class_name = model.names[cls]
            
            waste_type = get_waste_type(class_name)
            
            # Only include if we can categorize it, or return all?
            # Let's return everything but highlight the waste type
            
            detections.append({
                "bbox": [x1, y1, x2, y2],
                "class": class_name,
                "confidence": confidence,
                "waste_type": waste_type
            })

    return {"detections": detections}
