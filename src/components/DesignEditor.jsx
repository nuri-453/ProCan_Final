import React, { useState, useRef } from "react";
import "../App.css"; // Stil dosyan buradaysa doğru yol

const DesignEditor = () => {
  const [elements, setElements] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const designRef = useRef(null);

  const addText = () => {
    const newText = {
      id: Date.now(),
      type: "text",
      content: "Yeni Metin",
      style: {
        top: 100,
        left: 100,
        position: "absolute",
        zIndex: elements.length + 1,
      },
    };
    setElements([...elements, newText]);
  };

  const addShape = (shapeType) => {
    const baseStyle = {
      width: 60,
      height: 60,
      backgroundColor: "#2196F3",
      position: "absolute",
      top: 120,
      left: 120,
      zIndex: elements.length + 1,
    };
    const shapeStyle =
      shapeType === "circle"
        ? { ...baseStyle, borderRadius: "50%" }
        : baseStyle;

    setElements([
      ...elements,
      { id: Date.now(), type: "shape", style: shapeStyle },
    ]);
  };

  const handleUpdate = (key, value) => {
    setElements((prev) =>
      prev.map((el) =>
        el.id === selectedId
          ? {
              ...el,
              content: key === "content" ? value : el.content,
              style: { ...el.style, [key]: value },
            }
          : el
      )
    );
  };

  return (
    <>
      <h2>🎨 ProCan Tasarım Modülü</h2>
      <div>
        <button onClick={addText}>Metin</button>
        <button onClick={() => addShape("square")}>Kare</button>
        <button onClick={() => addShape("circle")}>Daire</button>
      </div>

      <div id="canvas" ref={designRef}>
        {elements.map((el) => (
          <div
            key={el.id}
            onClick={() => setSelectedId(el.id)}
            style={el.style}
          >
            {el.type === "text" ? el.content : ""}
          </div>
        ))}
      </div>

      {selectedId && (
        <div style={{ marginTop: "20px" }}>
          <h3>🔧 Seçilen Nesne Ayarları</h3>
          <label>
            Yazı İçeriği:
            <input
              type="text"
              onChange={(e) => handleUpdate("content", e.target.value)}
            />
          </label>
          <label>
            Yazı Rengi:
            <input
              type="color"
              onChange={(e) => handleUpdate("color", e.target.value)}
            />
          </label>
          <label>
            Arka Plan:
            <input
              type="color"
              onChange={(e) =>
                handleUpdate("backgroundColor", e.target.value)
              }
            />
          </label>
          <label>
            Yazı Boyutu:
            <input
              type="number"
              onChange={(e) =>
                handleUpdate("fontSize", e.target.value + "px")
              }
            />
          </label>
        </div>
      )}
    </>
  );
};

export default DesignEditor;
