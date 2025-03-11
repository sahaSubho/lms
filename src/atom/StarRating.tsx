import React from "react";

const StarRating = ({
  size = 85,
  percentage,
}: {
  size?: number;
  percentage: number;
}) => {
  const gradientId = `gradient-${Math.random()}`; // Unique ID to avoid conflicts

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 70 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={gradientId}>
          <stop
            offset={`${
              percentage > 70
                ? percentage
                : percentage * (1 - (70 - percentage) / 100)
            }%`}
            stopColor="#D1AB41"
          />
          <stop
            offset={`${
              percentage > 70
                ? percentage
                : percentage * (1 - (70 - percentage) / 100)
            }%`}
            stopColor="#ABABAB"
          />
        </linearGradient>
      </defs>
      {/* Original Star SVG (Unchanged) */}
      <path
        d="M35.8712 1.50898C35.6939 1.19453 35.361 1 35 1C34.639 1 34.3061 1.19453 34.1288 1.50898L23.5618 20.2567L2.46629 24.5132C2.11246 24.5846 1.82456 24.8411 1.71302 25.1844C1.60148 25.5277 1.6836 25.9045 1.92789 26.1702L16.4927 42.0134L14.0219 63.3918C13.9805 63.7503 14.1355 64.1034 14.4275 64.3156C14.7195 64.5278 15.1032 64.5661 15.4315 64.4159L35 55.4598L54.5685 64.4159C54.8968 64.5661 55.2805 64.5278 55.5725 64.3156C55.8645 64.1034 56.0195 63.7503 55.9781 63.3918L53.5073 42.0134L68.0721 26.1702C68.3164 25.9045 68.3985 25.5277 68.287 25.1844C68.1754 24.8411 67.8875 24.5846 67.5337 24.5132L46.4382 20.2567L35.8712 1.50898Z"
        fill="#898989"
        stroke="#898989"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      <path
        d="M35 2L45.7917 21.1464L67.3359 25.4934L52.4614 41.6736L54.9847 63.5066L35 54.36L15.0153 63.5066L17.5386 41.6736L2.66408 25.4934L24.2083 21.1464L35 2Z"
        fill="#CDCDCD"
      />

      <mask
        id="star-mask"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="2"
        y="2"
        width="66"
        height="62"
      >
        <path
          d="M35 2L45.7917 21.1464L67.3359 25.4934L52.4614 41.6736L54.9847 63.5066L35 54.36L15.0153 63.5066L17.5386 41.6736L2.66408 25.4934L24.2083 21.1464L35 2Z"
          fill="white"
        />
      </mask>

      <g mask="url(#star-mask)">
        {/* Colored Overlay that Fills Based on Percentage */}
        <rect
          x="0"
          y="0"
          width={`${(percentage / 100) * 70}`}
          height="70"
          fill="gold"
        />
      </g>
      <g mask="url(#mask0_14300_1866)">
        <path
          d="M35 36.0005L13.75 65.7505L35 57.2505L55.1875 63.6255V42.3755L67.9375 25.3755L35 36.0005Z"
          // fill="#ABABAB"
          fill={`url(#${gradientId})`}
        />
        <path
          opacity="0.4"
          d="M22.2499 19L2.06244 25.375L34.9999 36V-0.125L22.2499 19Z"
          fill="white"
        />
      </g>
    </svg>
  );
};

export default StarRating;
