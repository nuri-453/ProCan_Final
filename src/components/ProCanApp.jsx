import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import DesignEditor from './DesignEditor';
import VideoEditor from './VideoEditor';
import VideoExport from './VideoExport'; // Yeni eklenen bileşen

export default function ProCanApp() {
  return (
    <Router>
      <header>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            marginBottom: '1rem',
            marginTop: '1rem',
          }}
        >
          <Link to="/">Ana Sayfa</Link>
          <Link to="/design">Tasarım Oluştur</Link>
          <Link to="/video">Video Düzenle</Link>
          <Link to="/export">Dışa Aktar</Link> {/* Menüye yeni bağlantı */}
        </div>
      </header>

      <Routes>
        <Route
          path="/"
          element={
            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
              <h1 style={{ fontSize: '2.2rem', color: '#222', marginBottom: '1rem' }}>
                ProCan'a Hoş Geldin 🎉
              </h1>
              <p style={{ fontSize: '1.1rem', color: '#555', marginBottom: '2rem' }}>
                Aşağıdan bir modül seçerek tasarlamaya veya düzenlemeye başla.
              </p>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '1.5rem',
                }}
              >
                <Link
                  to="/design"
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    borderRadius: '5px',
                    textDecoration: 'none',
                  }}
                >
                  Tasarım Oluştur
                </Link>
                <Link
                  to="/video"
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#28a745',
                    color: '#fff',
                    borderRadius: '5px',
                    textDecoration: 'none',
                  }}
                >
                  Video Düzenle
                </Link>
                <Link
                  to="/export"
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#ff9800',
                    color: '#fff',
                    borderRadius: '5px',
                    textDecoration: 'none',
                  }}
                >
                  Dışa Aktar
                </Link>
              </div>
            </div>
          }
        />
        <Route path="/design" element={<DesignEditor />} />
        <Route path="/video" element={<VideoEditor />} />
        <Route path="/export" element={<VideoExport />} /> {/* Export sayfası yönlendirme */}
      </Routes>
    </Router>
  );
}
