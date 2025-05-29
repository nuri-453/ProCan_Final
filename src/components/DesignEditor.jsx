import React, { useState } from "react";
import { SketchPicker } from "react-color";

function DesignEditor() {
  const [color, setColor] = useState("#333333");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [videoFile, setVideoFile] = useState(null);
  const [videoURL, setVideoURL] = useState(null);

  // Video seçildiğinde çağrılır
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setVideoFile(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoURL(url);
    } else {
      setVideoURL(null);
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Tasarım Editörü</h2>
      
      <div style={{ marginBottom: "30px" }}>
        <b>Renk Seçici</b>
        <div style={{ marginTop: 14, marginBottom: 14 }}>
          <SketchPicker color={color} onChangeComplete={c => setColor(c.hex)} />
        </div>
        <div
          style={{
            width: 160, height: 50, borderRadius: 8, background: color,
            border: "1px solid #ddd", marginBottom: 12
          }}
        />
      </div>
      
      <div style={{ marginBottom: "30px" }}>
        <h2>Video Yükle</h2>
        <input type="file" accept="video/*" onChange={handleVideoChange} />
        {videoURL && (
          <div style={{ marginTop: 16 }}>
            <video src={videoURL} controls width="320" />
            <div style={{ fontSize: 14, marginTop: 6 }}>
              {videoFile?.name} ({(videoFile?.size / 1024).toFixed(1)} KB)
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DesignEditor;
