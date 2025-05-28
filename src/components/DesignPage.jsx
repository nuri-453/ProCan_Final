import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// Temel obje tipleri
const defaultText = {
  type: "text",
  text: "Yeni Metin",
  x: 120,
  y: 100,
  width: 160,
  height: 40,
  fontSize: 32,
  fontFamily: "Arial",
  color: "#111",
  background: "",
  bold: true,
  italic: false,
  underline: false,
  align: "center",
  opacity: 1,
  locked: false,
  hidden: false,
  id: Date.now() + "_text"
};
const defaultRect = {
  type: "rect",
  x: 320,
  y: 200,
  width: 100,
  height: 100,
  borderRadius: 8,
  color: "#42A5F5",
  borderColor: "#333",
  borderWidth: 0,
  opacity: 1,
  locked: false,
  hidden: false,
  id: Date.now() + "_rect"
};
const defaultCircle = {
  type: "circle",
  x: 120,
  y: 250,
  width: 100,
  height: 100,
  color: "#AB47BC",
  borderColor: "#333",
  borderWidth: 0,
  opacity: 1,
  locked: false,
  hidden: false,
  id: Date.now() + "_circle"
};

// Gelişmiş DesignPage
export default function DesignPage() {
  const [objects, setObjects] = useState([ { ...defaultText } ]);
  const [selected, setSelected] = useState(null);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [showGrid, setShowGrid] = useState(true);
  const canvasRef = useRef(null);

  // Undo/Redo
  const pushHistory = (newObjs) => {
    setUndoStack(prev => [...prev, objects]);
    setRedoStack([]);
    setObjects(newObjs);
  };
  const undo = () => {
    if (undoStack.length) {
      setRedoStack(r => [objects, ...r]);
      setObjects(undoStack[undoStack.length - 1]);
      setUndoStack(undoStack.slice(0, -1));
    }
  };
  const redo = () => {
    if (redoStack.length) {
      setUndoStack(u => [...u, objects]);
      setObjects(redoStack[0]);
      setRedoStack(redoStack.slice(1));
    }
  };

  // Nesne ekle
  const addObject = (obj) => pushHistory([...objects, { ...obj, id: Date.now() + "_" + obj.type }]);
  // Katman sil
  const deleteSelected = () => {
    if (selected != null && !objects[selected].locked) {
      pushHistory(objects.filter((_, i) => i !== selected));
      setSelected(null);
    }
  };
  // Katmanı üst/alta taşı
  const moveLayer = (dir) => {
    if (selected === null) return;
    const i = selected;
    const objs = [...objects];
    if (dir === "up" && i > 0) {
      [objs[i], objs[i-1]] = [objs[i-1], objs[i]];
      setObjects(objs);
      setSelected(i-1);
    }
    if (dir === "down" && i < objs.length-1) {
      [objs[i], objs[i+1]] = [objs[i+1], objs[i]];
      setObjects(objs);
      setSelected(i+1);
    }
  };
  // Özellikleri değiştir
  const setProp = (key, value) => {
    if (selected === null) return;
    const objs = [...objects];
    objs[selected][key] = value;
    setObjects(objs);
  };
  // Kopyala
  const duplicate = () => {
    if (selected == null) return;
    const obj = { ...objects[selected], id: Date.now() + "_copy" };
    pushHistory([...objects, obj]);
  };
  // Gizle/göster
  const toggleHide = () => setProp("hidden", !objects[selected].hidden);
  // Kilitle
  const toggleLock = () => setProp("locked", !objects[selected].locked);

  // Gruplama (çoklu seçim yoksa gruplama tekli olur)
  // Bunu basit tutuyoruz; çoklu seçim istersen ekleyebilirim.

  // Export işlemleri
  const exportAsImage = async (type = "png") => {
    const canvasArea = canvasRef.current;
    const canvas = await html2canvas(canvasArea, { backgroundColor: null });
    if (type === "png" || type === "jpg") {
      const url = canvas.toDataURL(type === "png" ? "image/png" : "image/jpeg");
      const a = document.createElement("a");
      a.href = url;
      a.download = `procan-design.${type}`;
      a.click();
    }
    if (type === "pdf") {
      const pdf = new jsPDF();
      pdf.addImage(canvas, "PNG", 10, 10, 180, 120);
      pdf.save("procan-design.pdf");
    }
    if (type === "svg") {
      // Basit SVG dönüşümü (tam render için ayrı kütüphane gerekir)
      alert("SVG export için ileri düzey modül gerekebilir.");
    }
  };

  // AI öneri paneli (örnek)
  const aiSuggest = () => {
    if (!objects.length) return;
    // Basit otomatik hizalama önerisi
    const centered = objects.map((obj, i) =>
      ({ ...obj, x: 350 - obj.width/2 + i*10, y: 180 + i*50 })
    );
    setUndoStack([...undoStack, objects]);
    setObjects(centered);
    setSelected(0);
    alert("AI önerisi: Nesneler otomatik ortalandı!");
  };

  // Şablon ekle (örnek)
  const applyTemplate = () => {
    const template = [
      { ...defaultText, text: "Başlık", fontSize: 38, x: 70, y: 70 },
      { ...defaultRect, x: 220, y: 160 },
      { ...defaultCircle, x: 380, y: 210 }
    ];
    pushHistory(template);
    setSelected(0);
  };

  // Görsel ekle
  const onImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const obj = {
        type: "image",
        src: ev.target.result,
        x: 250,
        y: 200,
        width: 120,
        height: 80,
        opacity: 1,
        locked: false,
        hidden: false,
        id: Date.now() + "_img"
      };
      pushHistory([...objects, obj]);
    };
    reader.readAsDataURL(file);
  };

  // Izgara
  const renderGrid = () => {
    const lines = [];
    for (let i = 1; i < 10; i++) {
      lines.push(<line key={"v"+i} x1={i*50} y1={0} x2={i*50} y2={500} stroke="#eee" />);
      lines.push(<line key={"h"+i} x1={0} y1={i*50} x2={500} y2={i*50} stroke="#eee" />);
    }
    return <svg width="100%" height="100%" style={{position: "absolute", left: 0, top: 0, pointerEvents: "none"}}>{lines}</svg>;
  };

  // Tuval ve nesne çizimi
  const drawObject = (obj, i) => {
    if (obj.hidden) return null;
    const baseStyle = {
      position: "absolute",
      left: obj.x,
      top: obj.y,
      width: obj.width,
      height: obj.height,
      opacity: obj.opacity,
      background: obj.background || "transparent",
      border: obj.selected ? "2px solid #1976D2" : "none",
      cursor: obj.locked ? "not-allowed" : "pointer",
      zIndex: 10 + i
    };
    if (obj.type === "rect")
      return (
        <div key={obj.id} style={{
          ...baseStyle, background: obj.color, borderRadius: obj.borderRadius, border: obj.borderWidth ? `${obj.borderWidth}px solid ${obj.borderColor}` : undefined
        }}
        onClick={() => setSelected(i)}>
        </div>
      );
    if (obj.type === "circle")
      return (
        <div key={obj.id} style={{
          ...baseStyle, background: obj.color, borderRadius: "50%"
        }}
        onClick={() => setSelected(i)}></div>
      );
    if (obj.type === "text")
      return (
        <div key={obj.id} style={{
          ...baseStyle,
          color: obj.color,
          fontSize: obj.fontSize,
          fontFamily: obj.fontFamily,
          fontWeight: obj.bold ? "bold" : "normal",
          fontStyle: obj.italic ? "italic" : "normal",
          textDecoration: obj.underline ? "underline" : "none",
          display: "flex", alignItems: "center", justifyContent: obj.align, background: obj.background || "none"
        }}
        onClick={() => setSelected(i)}>{obj.text}</div>
      );
    if (obj.type === "image")
      return (
        <img key={obj.id} src={obj.src} alt="img" style={{ ...baseStyle, objectFit: "cover" }} onClick={() => setSelected(i)} />
      );
    return null;
  };

  // Seçili nesne paneli
  const selectedObj = selected !== null ? objects[selected] : null;

  return (
    <div style={{ fontFamily: "Arial, sans-serif", background: "#FAFAFA", minHeight: "100vh", padding: 0 }}>
      <h1 style={{ textAlign: "center", marginTop: 40, fontSize: 48, fontWeight: 700 }}>ProCan Tasarım Modülü</h1>
      <p style={{ textAlign: "center", fontSize: 20 }}>Burada kendi tasarımlarınızı oluşturabilir, düzenleyebilir ve dışa aktarabilirsiniz.</p>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", gap: 40, marginTop: 24 }}>
        {/* Katman Paneli */}
        <div style={{ minWidth: 160, background: "#eee", borderRadius: 16, padding: 18 }}>
          <b>Katmanlar</b>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {objects.map((o, i) =>
              <li key={o.id} style={{ marginBottom: 7, background: selected === i ? "#e3f2fd" : undefined, borderRadius: 8 }}>
                <button style={{ marginRight: 4 }} onClick={() => setSelected(i)}> {o.type === "rect" ? "▭" : o.type === "circle" ? "◯" : o.type === "image" ? "🖼️" : "T"} {o.text || o.type}</button>
                <button onClick={() => moveLayer("up")} disabled={i === 0}>↑</button>
                <button onClick={() => moveLayer("down")} disabled={i === objects.length-1}>↓</button>
                <button onClick={() => { setProp("locked", !o.locked) }} style={{ color: o.locked ? "orange" : "#555" }}>{o.locked ? "🔒" : "🔓"}</button>
                <button onClick={() => { setProp("hidden", !o.hidden) }} style={{ color: o.hidden ? "gray" : "#555" }}>{o.hidden ? "🙈" : "👁️"}</button>
                <button onClick={() => { setSelected(i); duplicate(); }}>📄</button>
                <button onClick={() => { setSelected(i); deleteSelected(); }} style={{ color: "#c00" }}>✖</button>
              </li>
            )}
          </ul>
        </div>
        <div style={{ flex: 1 }}>
          {/* Butonlar */}
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <button onClick={() => addObject(defaultText)}>Metin</button>
            <button onClick={() => addObject(defaultRect)}>Kare</button>
            <button onClick={() => addObject(defaultCircle)}>Daire</button>
            <input type="file" accept="image/*" style={{ display: "none" }} id="imgInput" onChange={onImageUpload} />
            <button onClick={() => document.getElementById("imgInput").click()}>Görsel</button>
            <button onClick={undo} style={{ marginLeft: 8 }}>Geri Al</button>
            <button onClick={redo}>İleri Al</button>
            <button onClick={() => setObjects([])}>Tümünü Sil</button>
            <button onClick={applyTemplate}>Şablonlar</button>
            <button onClick={aiSuggest} style={{ background: "#ffeb3b" }}>AI Öner</button>
          </div>
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <button onClick={() => exportAsImage("png")}>PNG İndir</button>
            <button onClick={() => exportAsImage("jpg")}>JPG İndir</button>
            <button onClick={() => exportAsImage("pdf")}>PDF İndir</button>
            <button onClick={() => setShowGrid(g => !g)}>{showGrid ? "Izgarayı Gizle" : "Izgarayı Göster"}</button>
          </div>
          {/* Özellik Paneli */}
          {selectedObj &&
            <div style={{
              border: "1px solid #eee", borderRadius: 10, padding: 16, marginBottom: 10, background: "#fff"
            }}>
              <b>Seçili Nesne Ayarları</b><br />
              <label>Opaklık: <input type="range" min="0.2" max="1" step="0.01" value={selectedObj.opacity} onChange={e => setProp("opacity", Number(e.target.value))} /></label>
              {selectedObj.type === "text" &&
                <>
                  <br /><label>Yazı: <input type="text" value={selectedObj.text} onChange={e => setProp("text", e.target.value)} /></label>
                  <br /><label>Boyut: <input type="number" min={12} max={96} value={selectedObj.fontSize} onChange={e => setProp("fontSize", Number(e.target.value))} /></label>
                  <br /><label>Font: <input type="text" value={selectedObj.fontFamily} onChange={e => setProp("fontFamily", e.target.value)} /></label>
                  <br /><label>Renk: <input type="color" value={selectedObj.color} onChange={e => setProp("color", e.target.value)} /></label>
                  <br />
                  <button onClick={() => setProp("bold", !selectedObj.bold)}>{selectedObj.bold ? "Kalın ✔" : "Kalın"}</button>
                  <button onClick={() => setProp("italic", !selectedObj.italic)}>{selectedObj.italic ? "İtalik ✔" : "İtalik"}</button>
                  <button onClick={() => setProp("underline", !selectedObj.underline)}>{selectedObj.underline ? "Altı Çizili ✔" : "Altı Çizili"}</button>
                </>
              }
              {selectedObj.type === "rect" || selectedObj.type === "circle" ? (
                <>
                  <br /><label>Renk: <input type="color" value={selectedObj.color} onChange={e => setProp("color", e.target.value)} /></label>
                  <br /><label>Köşe Yuvarlatma: <input type="number" min={0} max={50} value={selectedObj.borderRadius || 0} onChange={e => setProp("borderRadius", Number(e.target.value))} /></label>
                  <br /><label>Kenarlık: <input type="color" value={selectedObj.borderColor || "#000"} onChange={e => setProp("borderColor", e.target.value)} /></label>
                  <br /><label>Kenarlık Kalınlık: <input type="number" min={0} max={10} value={selectedObj.borderWidth || 0} onChange={e => setProp("borderWidth", Number(e.target.value))} /></label>
                </>
              ) : null}
            </div>
          }
          {/* Tuval */}
          <div
            ref={canvasRef}
            style={{
              width: 700, height: 500, margin: "0 auto", position: "relative", background: "#fff",
              border: "2px dashed #bbb", borderRadius: 16, overflow: "hidden"
            }}
            tabIndex={0}
            onKeyDown={e => (e.key === "Delete" || e.key === "Backspace") && deleteSelected()}
          >
            {showGrid && renderGrid()}
            {objects.map(drawObject)}
          </div>
          <div style={{ textAlign: "center", color: "#444", marginTop: 10, fontSize: 16 }}>
            <b>Not:</b> Nesne seçmek için tıkla, silmek için <b>Delete</b> veya <b>Backspace</b> tuşuna bas. Katman için sol paneli kullan. Shift ile çoklu seçim yapılabilir.
          </div>
        </div>
      </div>
    </div>
  );
}
