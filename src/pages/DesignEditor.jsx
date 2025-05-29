import React, { useState } from "react";
import { ChromePicker } from "react-color";

function DesignEditor() {
  const [color, setColor] = useState("#3b82f6");
  const [videoFile, setVideoFile] = useState(null);

  return (
    <div style={{ padding: 32 }}>
      <h1>Tasarım Editörü</h1>
      <div style={{ marginBottom: 24 }}>
        <h2>Renk Seçici</h2>
        <ChromePicker
          color={color}
          onChangeComplete={c => setColor(c.hex)}
        />
        <div style={{
          marginTop: 12,
          width: 120,
          height: 50,
          background: color,
          borderRadius: 8,
          border: "1px solid #888",
        }} />
      </div>
      <div>
        <h2>Video Yükle</h2>
        <input
          type="file"
          accept="video/*"
          onChange={e => setVideoFile(e.target.files[0])}
        />
        {videoFile && (
          <video
            src={URL.createObjectURL(videoFile)}
            controls
            width={300}
            style={{ marginTop: 16 }}
          />
        )}
      </div>
    </div>
  );
}

export default DesignEditor;
