"use client";

import React from "react";

interface KamonProps {
  className?: string;
  size?: number;
  color?: string;
  type?: "oda" | "tokugawa" | "toyotomi" | "blossom" | "sword";
}

export default function KamonCrest({
  className = "",
  size = 64,
  color = "#F20D3A",
  type = "oda",
}: KamonProps) {
  if (type === "oda") {
    // Oda Mokko (Quince flower clan crest as seen in Frame 1 & 27 of the video)
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <circle cx="50" cy="50" r="46" stroke={color} strokeWidth="3" />
        <circle cx="50" cy="50" r="42" fill={color} fillOpacity="0.08" />
        {/* 5 Petals of the Oda Mokko */}
        {[0, 72, 144, 216, 288].map((angle, i) => (
          <path
            key={i}
            d="M 50 20 C 44 26, 42 36, 50 42 C 58 36, 56 26, 50 20 Z"
            fill={color}
            transform={`rotate(${angle} 50 50)`}
          />
        ))}
        {/* Outer petal lobes */}
        {[0, 72, 144, 216, 288].map((angle, i) => (
          <circle
            key={`outer-${i}`}
            cx="50"
            cy="24"
            r="8"
            fill={color}
            transform={`rotate(${angle} 50 50)`}
          />
        ))}
        {/* Center pistil */}
        <circle cx="50" cy="50" r="8" fill={color} />
        <circle cx="50" cy="50" r="4" fill="#F5F0E7" />
      </svg>
    );
  }

  if (type === "tokugawa") {
    // Tokugawa Mitsuba Aoi (Three-leaf Hollyhock crest as seen in Frame 27)
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <circle cx="50" cy="50" r="46" stroke={color} strokeWidth="4" />
        {/* 3 Leaves meeting in the center */}
        {[0, 120, 240].map((angle, i) => (
          <g key={i} transform={`rotate(${angle} 50 50)`}>
            <path
              d="M 50 46 C 40 40, 32 26, 42 16 C 52 20, 58 28, 50 46 Z"
              fill={color}
            />
            <path
              d="M 50 46 C 60 40, 68 26, 58 16 C 48 20, 42 28, 50 46 Z"
              fill={color}
            />
            {/* Veins */}
            <line x1="50" y1="46" x2="50" y2="20" stroke="#F5F0E7" strokeWidth="1.5" />
          </g>
        ))}
        <circle cx="50" cy="50" r="6" fill={color} />
      </svg>
    );
  }

  if (type === "sword") {
    // Crossed Katana swords crest
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <circle cx="50" cy="50" r="46" stroke={color} strokeWidth="2.5" />
        {/* Sword 1 */}
        <path
          d="M 22 78 L 78 22"
          stroke={color}
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        {/* Tsuba / Guard 1 */}
        <ellipse cx="32" cy="68" rx="6" ry="2" transform="rotate(-45 32 68)" fill={color} />
        {/* Sword 2 */}
        <path
          d="M 78 78 L 22 22"
          stroke={color}
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        {/* Tsuba / Guard 2 */}
        <ellipse cx="68" cy="68" rx="6" ry="2" transform="rotate(45 68 68)" fill={color} />
      </svg>
    );
  }

  // Default Blossom Mon
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="50" cy="50" r="46" stroke={color} strokeWidth="2.5" />
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <circle
          key={i}
          cx="50"
          cy="26"
          r="10"
          fill={color}
          transform={`rotate(${angle} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="10" fill="#F5F0E7" stroke={color} strokeWidth="2" />
      <circle cx="50" cy="50" r="4" fill={color} />
    </svg>
  );
}
