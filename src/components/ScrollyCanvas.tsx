"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useTransform, useMotionValueEvent, MotionValue } from "framer-motion";

const FRAME_COUNT = 120;

export default function ScrollyCanvas({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const [hasFirstFrame, setHasFirstFrame] = useState(false);
  const isInitializedRef = useRef(false);

  // Map scroll progress (0 to 1) to frame indices (0 to 119)
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const frames = framesRef.current;
    const targetIdx = Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(index)));

    // 1. Try exact target frame
    let img = frames.get(targetIdx);

    // 2. If target frame not loaded yet, find closest loaded frame
    if (!img && frames.size > 0) {
      let closestIdx = 0;
      let minDiff = Infinity;
      for (const idx of frames.keys()) {
        const diff = Math.abs(idx - targetIdx);
        if (diff < minDiff) {
          minDiff = diff;
          closestIdx = idx;
        }
      }
      img = frames.get(closestIdx);
    }

    if (!img) {
      // Clean fallback background while initial image loads
      ctx.fillStyle = "#0f1422";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      return;
    }

    // High performance cover logic
    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.max(hRatio, vRatio);
    const centerShift_x = (canvas.width - img.width * ratio) / 2;
    const centerShift_y = (canvas.height - img.height * ratio) / 2;

    ctx.fillStyle = "#0f1422";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
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
    if (isInitializedRef.current) return;
    isInitializedRef.current = true;

    let isDisposed = false;

    // Detect actual phone devices (screen < 768px AND mobile browser user agent)
    // On laptops (even touchscreen laptops like HP x360), isSmallMobile is false!
    const isSmallMobile = 
      typeof window !== "undefined" && 
      window.innerWidth < 768 && 
      /Android|iPhone|iPod|Mobile/i.test(navigator.userAgent);

    const getFrameUrl = (i: number) => {
      const formatted = i.toString().padStart(3, "0");
      return `/sequence/frame_${formatted}_delay-0.067s.png`;
    };

    // Helper to load a single image
    const loadImage = (idx: number): Promise<HTMLImageElement | null> => {
      return new Promise((resolve) => {
        if (isDisposed) return resolve(null);
        if (framesRef.current.has(idx)) {
          return resolve(framesRef.current.get(idx)!);
        }

        const img = new Image();
        img.src = getFrameUrl(idx);
        img.onload = () => {
          if (!isDisposed) {
            framesRef.current.set(idx, img);
            // If user is currently near this frame, re-render immediately
            const cur = Math.round(frameIndex.get());
            if (Math.abs(cur - idx) <= 2) {
              drawFrame(cur);
            }
          }
          resolve(img);
        };
        img.onerror = () => {
          resolve(null);
        };
      });
    };

    // 1. Instant First Frame: Load poster or frame 0 immediately (<30ms)
    const firstImg = new Image();
    firstImg.src = "/poster.jpg";
    firstImg.onload = () => {
      if (isDisposed) return;
      framesRef.current.set(0, firstImg);
      setHasFirstFrame(true);
      drawFrame(frameIndex.get());
      startProgressivePreload();
    };
    firstImg.onerror = () => {
      // Fallback directly to sequence frame 0
      loadImage(0).then((img) => {
        if (img && !isDisposed) {
          setHasFirstFrame(true);
          drawFrame(frameIndex.get());
          startProgressivePreload();
        }
      });
    };

    // 2. Progressive preloading that works immediately on laptop and mobile
    const startProgressivePreload = async () => {
      if (isDisposed) return;

      // Priority Stage A: Load distributed keyframes across the timeline (0, 10, 20... 119)
      // Within ~250ms, the background animation works across the ENTIRE scroll height!
      const keyframeIndices = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 119];
      await Promise.all(keyframeIndices.map(idx => loadImage(idx)));

      if (isDisposed) return;
      drawFrame(frameIndex.get());

      // Priority Stage B: Fill in remaining frames
      // - Mobile phones: loads every 3rd frame (40 frames total, ~12MB, ultra-light & fast)
      // - Laptops & Desktops: loads all 120 frames for 60fps cinematic smoothness
      const step = isSmallMobile ? 3 : 1;
      const remainingIndices: number[] = [];
      for (let i = 0; i < FRAME_COUNT; i += step) {
        if (!framesRef.current.has(i)) {
          remainingIndices.push(i);
        }
      }

      // Load in concurrent pools of 8 requests to avoid browser socket bottlenecks
      const CONCURRENCY = isSmallMobile ? 4 : 8;
      for (let i = 0; i < remainingIndices.length; i += CONCURRENCY) {
        if (isDisposed) break;
        const chunk = remainingIndices.slice(i, i + CONCURRENCY);
        await Promise.all(chunk.map(idx => loadImage(idx)));
      }
    };

    const handleResize = () => {
      if (!canvasRef.current) return;
      const dpr = Math.min(window.devicePixelRatio || 1, isSmallMobile ? 1.5 : 2);
      canvasRef.current.width = window.innerWidth * dpr;
      canvasRef.current.height = window.innerHeight * dpr;
      drawFrame(frameIndex.get());
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      isDisposed = true;
      window.removeEventListener("resize", handleResize);
    };
  }, [drawFrame, frameIndex]);

  // Sync frame on scroll with high efficiency
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
