"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const FRAME_COUNT = 120; // Number of frames in public/sequence

export default function ScrollyCanvas({ scrollYProgress }: { scrollYProgress: any }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  useEffect(() => {
    // Preload images
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;
    let errorCount = 0;
    
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      // Format: frame_000_delay-0.067s.png (3 digits)
      const formattedIndex = i.toString().padStart(3, '0');
      img.src = `/sequence/frame_${formattedIndex}_delay-0.067s.png`;
      
      const checkCompletion = () => {
        if (loadedCount + errorCount === FRAME_COUNT) {
          if (loadedCount > 0) {
            // Filter out any broken images just in case
            const validImages = loadedImages.filter(img => img.complete && img.naturalHeight !== 0);
            setImages(validImages);
            drawFrame(0, validImages);
          } else {
            console.error("Failed to load any sequence images from /public/sequence/");
            setImages([]);
            drawFrame(0, []);
          }
        }
      };

      img.onload = () => {
        loadedCount++;
        checkCompletion();
      };
      
      img.onerror = () => {
        errorCount++;
        checkCompletion();
      };
      
      loadedImages.push(img);
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const drawFrame = (index: number, imgList: HTMLImageElement[] = images) => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (imgList.length === 0) {
      // PROCEDURAL FALLBACK ANIMATION (If images are missing)
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const progress = index / FRAME_COUNT;
      
      // Draw dynamic gradient background
      const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      const r = Math.floor(10 + progress * 20).toString(16).padStart(2, '0');
      const b = Math.floor(20 + progress * 40).toString(16).padStart(2, '0');
      grad.addColorStop(0, `#${r}0f0f`);
      grad.addColorStop(1, `#0f0f${b}`);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw floating geometric particles
      ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
      for (let i = 0; i < 50; i++) {
        const x = (Math.sin(i * 13 + progress * 5) * 0.5 + 0.5) * canvas.width;
        const y = (Math.cos(i * 17 - progress * 4) * 0.5 + 0.5) * canvas.height;
        const size = Math.sin(i * 23 + progress * 10) * 10 + 15;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
      return;
    }

    const img = imgList[Math.floor(index)];
    if (!img) return;

    // Object-fit: cover logic
    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.max(hRatio, vRatio);
    const centerShift_x = (canvas.width - img.width * ratio) / 2;
    const centerShift_y = (canvas.height - img.height * ratio) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    );
  };

  useMotionValueEvent(frameIndex, "change", (latest) => {
    drawFrame(latest);
  });

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        drawFrame(frameIndex.get());
      }
    };
    
    window.addEventListener("resize", handleResize);
    handleResize();
    
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full object-cover z-0"
    />
  );
}
