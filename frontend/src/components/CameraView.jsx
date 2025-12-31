import React, { useRef, useState, useEffect, useCallback } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { Camera, RefreshCw, Upload, Image as ImageIcon } from "lucide-react";
import SurveyForm from "./SurveyForm";

const videoConstraints = {
  width: 640,
  height: 480,
  facingMode: "user",
};

const CameraView = () => {
  const webcamRef = useRef(null);

  const [imgSrc, setImgSrc] = useState(null);
  const [detections, setDetections] = useState([]);
  const [mode, setMode] = useState("camera"); // camera | upload
  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cameraError, setCameraError] = useState(null);

  /* ------------------ PREDICTION ------------------ */
  const handlePredict = async (input) => {
    setLoading(true);
    setDetections([]);

    try {
      const formData = new FormData();

      if (typeof input === "string") {
        const blob = await fetch(input).then((r) => r.blob());
        formData.append("file", new File([blob], "capture.jpg"));
      } else {
        formData.append("file", input);
      }

      const res = await axios.post("http://localhost:8000/predict", formData);
      setDetections(res.data?.detections || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* ------------------ CAMERA CAPTURE ------------------ */
  const capture = useCallback(() => {
    const image = webcamRef.current?.getScreenshot();
    if (!image) return;
    setImgSrc(image);
    handlePredict(image);
  }, []);

  /* ------------------ UPLOAD ------------------ */
  const onDrop = useCallback((files) => {
    const file = files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setImgSrc(reader.result);
    reader.readAsDataURL(file);

    handlePredict(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  /* ------------------ LIVE MODE ------------------ */
  useEffect(() => {
    if (!isLive || mode !== "camera") return;

    const id = setInterval(() => {
      if (webcamRef.current && !loading) {
        handlePredict(webcamRef.current.getScreenshot());
      }
    }, 1200);

    return () => clearInterval(id);
  }, [isLive, mode, loading]);

  const reset = () => {
    setImgSrc(null);
    setDetections([]);
    setIsLive(false);
  };

  /* ------------------ UI ------------------ */
  return (
    <div className="w-full px-4 sm:px-6 lg:px-10 flex flex-col items-center">
      {/* MODE SWITCH */}
      <div className="flex gap-2 mb-4 bg-slate-800/60 p-1 rounded-xl">
        {["camera", "upload"].map((item) => (
          <button
            key={item}
            onClick={() => {
              setMode(item);
              reset();
            }}
            className={`px-4 py-2 rounded-lg text-sm sm:text-base flex items-center gap-2 transition
              ${
                mode === item
                  ? "bg-blue-500 text-white"
                  : "text-slate-300 hover:bg-white/10"
              }`}
          >
            {item === "camera" ? <Camera size={18} /> : <Upload size={18} />}
            {item}
          </button>
        ))}
      </div>

      {/* CAMERA / IMAGE AREA */}
      <div className="relative w-full max-w-xl sm:max-w-2xl lg:max-w-4xl aspect-video bg-black rounded-xl overflow-hidden">
        {mode === "camera" && !imgSrc && (
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            className="w-full h-full object-cover"
            onUserMediaError={() =>
              setCameraError("Camera permission denied")
            }
          />
        )}

        {mode === "upload" && !imgSrc && (
          <div
            {...getRootProps()}
            className={`w-full h-full flex flex-col items-center justify-center text-slate-400 border-2 border-dashed rounded-xl cursor-pointer
              ${isDragActive ? "border-blue-400" : "border-slate-600"}`}
          >
            <input {...getInputProps()} />
            <ImageIcon size={48} />
            <p className="mt-2 text-sm text-center">
              Drag & drop image or tap to upload
            </p>
          </div>
        )}

        {imgSrc && (
          <img
            src={imgSrc}
            alt="preview"
            className="w-full h-full object-contain"
          />
        )}

        {/* BOUNDING BOXES */}
        {detections.map((det, i) => {
          const [x1, y1, x2, y2] = det.bbox;
          return (
            <div
              key={i}
              className="absolute border-2 border-green-400 text-xs text-white"
              style={{
                left: x1,
                top: y1,
                width: x2 - x1,
                height: y2 - y1,
              }}
            >
              <span className="bg-green-500 px-1">
                {det.class} {Math.round(det.confidence * 100)}%
              </span>
            </div>
          );
        })}
      </div>

      {/* CONTROLS */}
      <div className="flex flex-wrap justify-center gap-3 mt-5">
        {mode === "camera" && !imgSrc && (
          <button
            onClick={capture}
            className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-lg transition shadow-lg flex items-center gap-2"
            disabled={loading}
          >
            <Camera size={18} /> Capture
          </button>
        )}

        {mode === "camera" && !imgSrc && (
          <button
            onClick={() => setIsLive((p) => !p)}
            className={`px-4 py-2 rounded-lg border ${
              isLive ? "border-red-500 text-red-400" : "border-slate-500"
            }`}
          >
            {isLive ? "Stop Live" : "Start Live"}
          </button>
        )}

        {imgSrc && (
          <button
            onClick={reset}
            className="px-4 py-2 rounded-lg border border-slate-500 flex gap-2"
          >
            <RefreshCw size={18} /> Reset
          </button>
        )}
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 gap-4 mt-6 w-full max-w-xl text-center">
        <div className="bg-slate-800/60 rounded-xl p-4">
          <p className="text-slate-400 text-sm">Objects</p>
          <p className="text-2xl font-bold">{detections.length}</p>
        </div>
        <div className="bg-slate-800/60 rounded-xl p-4">
          <p className="text-slate-400 text-sm">Type</p>
          <p className="text-xl font-semibold">
            {detections[0]?.waste_type || "—"}
          </p>
        </div>
      </div>

      {/* SURVEY */}
      {imgSrc && detections.length > 0 && !loading && (
        <SurveyForm detection={detections[0]} onReset={reset} />
      )}
    </div>
  );
};

export default CameraView;
