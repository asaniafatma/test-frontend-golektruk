import { useState } from 'react';

const Soal1 = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Fungsi untuk menangani saat drag dimulai
  const handleDragStart = (e) => {
    // Menyimpan posisi awal mouse
    e.dataTransfer.setData('text/plain', JSON.stringify(position));
  };

  // Fungsi untuk menangani saat elemen dilepaskan dan memperbarui posisi
  const handleDrop = (e) => {
    e.preventDefault();
    const newPosition = {
      x: e.clientX - 20, // Menyesuaikan agar kotak tetap di tengah mouse
      y: e.clientY - 20
    };
    setPosition(newPosition);
  };

  return (
    <>
      <div
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDrop}
        style={{
          backgroundColor: '#fff',
          width: 40,
          height: 40,
          borderRadius: "8px",
          position: 'absolute',
          left: position.x,
          top: position.y,
          cursor: 'grab'
        }}
      >
      </div>

      {/* Hasil yang diharapkan */}
      <iframe
        src="/soal1.mp4"
        style={{
          position: "fixed",
          bottom: 0,
          right: 0,
          border: "1px solid white",
        }}
      ></iframe>
    </>
  );
};

export default Soal1;
