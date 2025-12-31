def get_waste_type(class_name):
    """
    Maps COCO class names to waste types.
    This is a HEURISTIC for demonstration purposes using a standard YOLOv8n model.
    For production, a custom model trained on waste data is required.
    """
    wet_waste = {
        'apple', 'banana', 'orange', 'broccoli', 'carrot', 'hot dog', 'pizza', 
        'donut', 'cake', 'sandwich', 'potted plant'
    }
    
    dry_waste = {
        'bottle', 'wine glass', 'cup', 'fork', 'knife', 'spoon', 'bowl', 
        'can', 'mouse', 'keyboard', 'cell phone', 'book', 'paper', 'plastic'
    }
    
    class_name = class_name.lower()
    
    if class_name in wet_waste:
        return "Wet Waste"
    elif class_name in dry_waste:
        return "Dry Waste"
    else:
        return "Unknown Waste"
