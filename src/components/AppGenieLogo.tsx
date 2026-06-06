"use client";

import React from "react";

/**
 * Inline SVG genie lamp icon.
 * Uses `currentColor` so it automatically matches the surrounding text color.
 */
export function GenieLampIcon({
  size = 18,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      className={`inline-block shrink-0 ${className}`}
    >
      {/* Lamp body */}
      <ellipse cx="30" cy="38" rx="19" ry="11" opacity="0.9" />
      {/* Spout */}
      <path d="M47 32 Q57 29 55 37 Q53 42 47 40 Z" opacity="0.85" />
      {/* Handle */}
      <path
        d="M13 32 Q5 32 5 40 Q5 47 13 45"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      {/* Lid */}
      <ellipse cx="30" cy="27" rx="13" ry="5" opacity="0.95" />
      {/* Knob */}
      <circle cx="30" cy="22" r="3" />
      {/* Smoke curl */}
      <path
        d="M30 19 Q35 13 30 8 Q25 3 30 -1"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.65"
      />
      <path
        d="M37 17 Q41 11 37 7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.45"
      />
      {/* Large star */}
      <polygon
        points="54,8 55.5,12 59.5,12 56.3,14.5 57.5,18.5 54,16 50.5,18.5 51.7,14.5 48.5,12 52.5,12"
        opacity="0.85"
      />
      {/* Small star */}
      <polygon
        points="42,4 43,6.5 45.5,6.5 43.5,8 44.3,10.5 42,9 39.7,10.5 40.5,8 38.5,6.5 41,6.5"
        opacity="0.6"
      />
    </svg>
  );
}

/**
 * AppGenie branded text + lamp icon combo.
 * The lamp icon uses `currentColor`, so it automatically matches
 * whatever text color is active in the parent element.
 *
 * @example
 * // White nav text
 * <AppGenieWordmark className="text-xl font-black text-white" />
 *
 * @example
 * // Emerald tinted
 * <AppGenieWordmark className="text-sm font-semibold text-emerald-500/60" iconSize={14} />
 */
export function AppGenieWordmark({
  iconSize = 18,
  className = "",
  textClassName = "",
}: {
  iconSize?: number;
  className?: string;
  textClassName?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-1.5 leading-none ${className}`}>
      <GenieLampIcon size={iconSize} />
      <span className={textClassName}>AppGenie</span>
    </span>
  );
}
