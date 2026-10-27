"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useTransform, useMotionValueEvent } from "framer-motion";

const FRAME_COUNT = 120;

export default function ScrollyCanvas({ scrollYProgress }: { scrollYProgress: any }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const [hasFirstFrame, setHasFirstFrame] = useState(false);
  const isMobileRef = useRef(false);

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const frames = framesRef.current;

    // Find requested frame, or closest available frame, or frame 0
    const targetIdx = Math.max(0, Math.min(FRAME_COUNT - 1, Math.floor(index)));
    let img = frames.get(targetIdx);

    if (!img && frames.size > 0) {
      // Find closest loaded frame
      let closestIdx = 0;
      let minDiff = Infinity;
      frames.forEach((_, idx) => {
        const diff = Math.abs(idx - targetIdx);
        if (diff < minDiff) {
          minDiff = diff;
          closestIdx = idx;
        }
      });
      img = frames.get(closestIdx);
    }

    if (!img) {
      // Procedural fallback while first image is being retrieved
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const progress = index / FRAME_COUNT;
      const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      grad.addColorStop(0, "#111116");
      grad.addColorStop(1, "#0a0a0d");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      return;
    }

    // Cover math with DPR consideration
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
  }, []);

  useEffect(() => {
    // 1. Detect device form factor
    const checkIsMobile = () => {
      return (
        window.innerWidth < 768 ||
        (navigator.maxTouchPoints > 0 && window.innerWidth < 1024)
      );
    };
    isMobileRef.current = checkIsMobile();

    // 2. Load instant lightweight poster frame FIRST (~52 KB, loads in <30ms)
    const posterImg = new Image();
    posterImg.src = "/poster.jpg";
    
    posterImg.onload = () => {
      framesRef.current.set(0, posterImg);
      setHasFirstFrame(true);
      drawFrame(0);

      // On mobile devices, the single ultra-fast poster is used for optimal performance & speed
      if (isMobileRef.current) {
        return;
      }

      // 3. For desktop, progressively preload remaining frames in small non-blocking batches
      let currentBatch = 1;
      const BATCH_SIZE = 6;

      const loadNextBatch = () => {
        if (currentBatch >= FRAME_COUNT) return;

        const end = Math.min(currentBatch + BATCH_SIZE, FRAME_COUNT);
        for (let i = currentBatch; i < end; i++) {
          const img = new Image();
          const formattedIndex = i.toString().padStart(3, "0");
          img.src = `/sequence/frame_${formattedIndex}_delay-0.067s.png`;
          img.onload = () => {
            framesRef.current.set(i, img);
          };
        }
        currentBatch = end;
        if (currentBatch < FRAME_COUNT) {
          if ("requestIdleCallback" in window) {
            (window as any).requestIdleCallback(loadNextBatch);
          } else {
            setTimeout(loadNextBatch, 80);
          }
        }
      };

      if ("requestIdleCallback" in window) {
        (window as any).requestIdleCallback(loadNextBatch);
      } else {
        setTimeout(loadNextBatch, 50);
      }
    };

    posterImg.onerror = () => {
      // Fallback to frame_000 if poster.jpg fails
      const fallbackImg = new Image();
      fallbackImg.src = "/sequence/frame_000_delay-0.067s.png";
      fallbackImg.onload = () => {
        framesRef.current.set(0, fallbackImg);
        setHasFirstFrame(true);
        drawFrame(0);
      };
    };

    const handleResize = () => {
      if (!canvasRef.current) return;
      isMobileRef.current = checkIsMobile();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvasRef.current.width = window.innerWidth * dpr;
      canvasRef.current.height = window.innerHeight * dpr;
      drawFrame(frameIndex.get());
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [drawFrame, frameIndex]);

  useMotionValueEvent(frameIndex, "change", (latest) => {
    drawFrame(latest);
  });

  return (
    <canvas
      ref={canvasRef}
      className={`absolute top-0 left-0 w-full h-full object-cover z-0 transition-opacity duration-700 ${
        hasFirstFrame ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}
