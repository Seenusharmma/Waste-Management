from ultralytics import YOLO

def train():
    # Load a model
    model = YOLO("yolov8n.pt")  # load a pretrained model (recommended for training)

    # Train the model
    # Note: 'data.yaml' should point to your dataset location
    # You can find datasets on Roboflow: https://universe.roboflow.com/search?q=waste
    results = model.train(data="coco128.yaml", epochs=3, imgsz=640) # Example using coco128, replace with your data.yaml

    # path to best model will be printed in output, usually runs/detect/train/weights/best.pt
    print("Training Complete")

if __name__ == '__main__':
    train()
