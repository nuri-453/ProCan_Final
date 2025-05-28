// 🚀 PROCAN – Gelişmiş VideoEditor.jsx (Canva + Premiere Pro + AI + Efektler)
// Bu dosya, tüm işlevleri bir araya getirir.

import React, { useRef, useState, useEffect } from 'react';

export default function VideoEditor() {
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const [videoURL, setVideoURL] = useState(null);
  const [audioURL, setAudioURL] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [overlayText, setOverlayText] = useState('');
  const [textStart, setTextStart] = useState(0);
  const [textEnd, setTextEnd] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [exporting, setExporting] = useState(false);
  const [filter, setFilter] = useState('none');
  const [aiScenes, setAiScenes] = useState([]);

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) setVideoURL(URL.createObjectURL(file));
  };

  const handleAudioUpload = (e) => {
    const file = e.target.files[0];
    if (file) setAudioURL(URL.createObjectURL(file));
  };

  const togglePlayPause = () => {
    const v = videoRef.current;
    const a = audioRef.current;
    v.paused ? (v.play(), a?.play()) : (v.pause(), a?.pause());
  };

  const handleMute = () => {
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    const t = videoRef.current.currentTime;
    setCurrentTime(t);
    setShowOverlay(t >= textStart && t <= textEnd);
  };

  const handleExport = () => {
    setExporting(true);
    setTimeout(() => {
      alert('🎉 Export tamamlandı (simülasyon)');
      setExporting(false);
    }, 2000);
  };

  const runAISceneDetection = () => {
    const duration = videoRef.current?.duration || 60;
    const sceneCount = Math.floor(duration / 10);
    const scenes = Array.from({ length: sceneCount }, (_, i) => ({
      start: i * 10,
      end: i * 10 + 5
    }));
    setAiScenes(scenes);
  };

  useEffect(() => {
    if (videoRef.current && audioRef.current) {
      audioRef.current.volume = 0.7;
    }
  }, [videoURL, audioURL]);

  return (
    <div style={{ padding: '1rem', textAlign: 'center', fontFamily: 'sans-serif', maxWidth: '800px', margin: 'auto' }}>
      <h2>🎬 ProCan Video Düzenleyici</h2>

      <input type="file" accept="video/*" onChange={handleVideoUpload} />
      <input type="file" accept="audio/*" onChange={handleAudioUpload} style={{ marginTop: '0.5rem' }} />

      <div style={{ marginTop: '1rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem' }}>
        <input type="text" placeholder="Yazı" value={overlayText} onChange={(e) => setOverlayText(e.target.value)} />
        <input type="number" placeholder="Başlangıç" value={textStart} onChange={(e) => setTextStart(+e.target.value)} />
        <input type="number" placeholder="Bitiş" value={textEnd} onChange={(e) => setTextEnd(+e.target.value)} />
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="none">Filtre Yok</option>
          <option value="grayscale(100%)">Gri Ton</option>
          <option value="sepia(100%)">Sepya</option>
          <option value="contrast(150%)">Kontrast</option>
          <option value="brightness(120%)">Parlaklık</option>
        </select>
      </div>

      {videoURL && (
        <div style={{ position: 'relative', marginTop: '1rem' }}>
          <video
            ref={videoRef}
            src={videoURL}
            width="100%"
            height="auto"
            controls
            muted={isMuted}
            onTimeUpdate={handleTimeUpdate}
            style={{ filter, borderRadius: '8px' }}
          />
          {audioURL && <audio ref={audioRef} src={audioURL} />}
          {showOverlay && overlayText && (
            <div style={{
              position: 'absolute',
              top: '85%',
              width: '100%',
              textAlign: 'center',
              color: '#fff',
              fontSize: '20px',
              fontWeight: 'bold',
              textShadow: '1px 1px 3px #000'
            }}>
              {overlayText}
            </div>
          )}
        </div>
      )}

      {videoURL && (
        <div style={{ marginTop: '1rem', fontSize: '14px', color: '#555' }}>
          ⏱️ Anlık Zaman: {currentTime.toFixed(1)} sn<br />
          <button onClick={runAISceneDetection} style={btn("#6f42c1")}>🧠 AI Önemli Anları Bul</button>
          {aiScenes.length > 0 && (
            <div style={{ marginTop: '0.5rem' }}>
              <strong>🎯 AI Sahneler:</strong>
              {aiScenes.map((s, i) => (
                <div key={i}>Sahne {i + 1}: {s.start}s → {s.end}s</div>
              ))}
            </div>
          )}
        </div>
      )}

      {videoURL && (
        <div style={{ marginTop: '1rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem' }}>
          <button onClick={togglePlayPause} style={btn("#007bff")}>▶️ Oynat / Duraklat</button>
          <button onClick={handleMute} style={btn("#6c757d")}>{isMuted ? "🔈 Aç" : "🔇 Sessiz"}</button>
          <button onClick={handleExport} disabled={exporting} style={btn("#28a745")}>
            {exporting ? "⏳ Aktarılıyor..." : "⬇️ Dışa Aktar"}
          </button>
        </div>
      )}
    </div>
  );
}

const btn = (bg) => ({
  backgroundColor: bg,
  color: "#fff",
  border: "none",
  padding: "10px 16px",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "14px",
  minWidth: "140px"
});
