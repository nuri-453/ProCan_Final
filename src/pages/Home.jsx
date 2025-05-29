import React from "react";
import jsPDF from "jspdf";

function Home() {
  // PDF İndir fonksiyonu
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("ProCan Ana Sayfa - PDF İndirildi!", 10, 10);
    doc.save("procan-ana-sayfa.pdf");
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>ProCan Ana Sayfa</h1>
      <button onClick={downloadPDF} style={{ marginBottom: "20px" }}>
        PDF İndir
      </button>
      <p>
        Hoşgeldiniz! Sol üstten 'Hakkında', 'Tasarım Editörü' ve karanlık mod
        seçeneklerine ulaşabilirsiniz.
      </p>
    </div>
  );
}

export default Home;
