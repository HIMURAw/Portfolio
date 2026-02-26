import React, { useEffect, useRef, useState } from "react";

export const HIMURA = () => {
  const penguinRef = useRef(null);
  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const penguinEl = penguinRef.current;
      if (!penguinEl) return;

      const rekt = penguinEl.getBoundingClientRect();

      const anchorX = rekt.left + rekt.width / 2;
      const anchorY = rekt.top + rekt.height / 2;
      // Gözlerin hareketini biraz daha belirgin ve her yöne eşit hale getir
      const intensity = 0.06;

      const moveX = (mouseX - anchorX) * intensity;
      const moveY = (mouseY - anchorY) * intensity;

      // Hareketi sınırla (pixel art gözler küçük, max 4px)
      const clamp = (val, min, max) => Math.min(Math.max(val, min), max);
      const clampedX = clamp(moveX, -4, 4);
      const clampedY = clamp(moveY, -4, 4);

      [leftEyeRef, rightEyeRef].forEach((eye) => {
        if (eye.current) {
          eye.current.style.transform = `translateX(${clampedX}px) translateY(${clampedY}px)`;
        }
      });
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      id="penguin"
      ref={penguinRef}
      style={{
        width: "70px",
        cursor: "pointer",
        position: "relative",
        display: "inline-block",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Ana pixel art görseli */}
      <img
        src="/himura.png"
        alt="character"
        style={{
          width: "100%",
          pointerEvents: "none",
          display: "block",
          imageRendering: "pixelated", // pixel art netliği için
        }}
      />

      {/* Göz overlay katmanı - görselin üzerine konumlandırılmış */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        {/* SOL GÖZ - %37 soldan, %28 yukarıdan */}
        <div
          ref={leftEyeRef}
          style={{
            position: "absolute",
            left: "37%",
            top: "28%",
            width: "3px",
            height: "3px",
            backgroundColor: "#2a1a0e",
            transition: "transform 0.05s ease-out",
            imageRendering: "pixelated",
          }}
        />

        <div
          ref={rightEyeRef}
          style={{
            position: "absolute",
            left: "52%",
            top: "28%",
            width: "3px",
            height: "3px",
            backgroundColor: "#2a1a0e",
            transition: "transform 0.05s ease-out",
            imageRendering: "pixelated",
          }}
        />
      </div>

      {hovered && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(255,255,255,0.08)",
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
};