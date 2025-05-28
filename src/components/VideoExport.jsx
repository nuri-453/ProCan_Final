import React, { useState } from 'react';

export default function VideoExport() {
  const [videoPath, setVideoPath] = useState('');
  const [audioPath, setAudioPath] = useState('');
  const [outputName, setOutputName] = useState('cikti.mp4');

  const handleExport = () => {
    if (!videoPath || !outputName) {
      alert('Lütfen video dosya yolunu ve çıktı adını belirtin.');
      return;
    }

    const command = audioPath
      ? `ffmpeg -i "${videoPath}" -i "${audioPath}" -shortest -c:v copy -c:a aac "${outputName}"`
      : `ffmpeg -i "${videoPath}" -an "${outputName}"`;

    navigator.clipboard.writeText(command);
    alert("FFmpeg komutu kopyalandı! CMD'ye yapıştırıp çalıştırabilirsiniz.");
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🎬 Video Export Paneli</h2>

      <div style={{ marginBottom: '1rem' }}>
        <label>🎞 Video Yolu: </label>
        <input type="text" value={videoPath} onChange={(e) => setVideoPath(e.target.value)} placeholder="C:\videolar\giris.mp4" />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>🎵 Müzik Yolu (opsiyonel): </label>
        <input type="text" value={audioPath} onChange={(e) => setAudioPath(e.target.value)} placeholder="C:\muzik\arkafon.mp3" />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>💾 Çıktı Dosyası Adı: </label>
        <input type="text" value={outputName} onChange={(e) => setOutputName(e.target.value)} placeholder="cikti.mp4" />
      </div>

      <button onClick={handleExport} style={{ padding: '10px 20px', background: '#2ecc71', color: '#fff', border: 'none', borderRadius: '5px' }}>
        Export Komutunu Kopyala
      </button>
    </div>
  );
}
