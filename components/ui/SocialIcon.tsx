import React from "react";

interface SocialIconProps extends React.SVGProps<SVGSVGElement> {
  network: string;
  size?: number;
  className?: string;
}

export function SocialIcon({ network, size = 24, className = "", ...props }: SocialIconProps) {
  const norm = (network || "").toLowerCase();

  if (norm.includes("instagram")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        {...props}
      >
        <defs>
          <radialGradient id="ig-grad" cx="20%" cy="105%" r="125%">
            <stop offset="0%" stopColor="#fdf497" />
            <stop offset="5%" stopColor="#fdf497" />
            <stop offset="45%" stopColor="#fd5949" />
            <stop offset="60%" stopColor="#d6249f" />
            <stop offset="90%" stopColor="#285AEB" />
          </radialGradient>
        </defs>
        <rect width="24" height="24" rx="6" fill="url(#ig-grad)" />
        <rect x="5.5" y="5.5" width="13" height="13" rx="3.8" stroke="#ffffff" strokeWidth="1.8" fill="none" />
        <circle cx="12" cy="12" r="3.2" stroke="#ffffff" strokeWidth="1.8" fill="none" />
        <circle cx="15.8" cy="8.2" r="0.9" fill="#ffffff" />
      </svg>
    );
  }

  if (norm.includes("tiktok")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        {...props}
      >
        <rect width="24" height="24" rx="6" fill="#000000" />
        <path
          d="M16.5 8.2c-1.1-.7-1.8-1.9-1.9-3.2h-2.3v10.1c0 1.3-1.1 2.4-2.4 2.4-1.3 0-2.4-1.1-2.4-2.4 0-1.3 1.1-2.4 2.4-2.4.3 0 .5.1.7.2v-2.4c-.2 0-.5-.1-.7-.1-2.6 0-4.8 2.1-4.8 4.8 0 2.6 2.1 4.8 4.8 4.8 2.6 0 4.8-2.1 4.8-4.8V9.9c1.1.8 2.4 1.2 3.8 1.3V8.8c-.8 0-1.5-.2-2-.6z"
          fill="#25F4EE"
        />
        <path
          d="M17 7.7c-1.1-.7-1.8-1.9-1.9-3.2h-2.3v10.1c0 1.3-1.1 2.4-2.4 2.4-1.3 0-2.4-1.1-2.4-2.4 0-1.3 1.1-2.4 2.4-2.4.3 0 .5.1.7.2V10c-.2 0-.5-.1-.7-.1-2.6 0-4.8 2.1-4.8 4.8 0 2.6 2.1 4.8 4.8 4.8 2.6 0 4.8-2.1 4.8-4.8V9.4c1.1.8 2.4 1.2 3.8 1.3V8.3c-.8 0-1.5-.2-1.9-.6z"
          fill="#FE2C55"
        />
        <path
          d="M16.8 8c-1.1-.7-1.8-1.9-1.9-3.2h-2.3v10.1c0 1.3-1.1 2.4-2.4 2.4-1.3 0-2.4-1.1-2.4-2.4 0-1.3 1.1-2.4 2.4-2.4.3 0 .5.1.7.2v-2.4c-.2 0-.5-.1-.7-.1-2.6 0-4.8 2.1-4.8 4.8 0 2.6 2.1 4.8 4.8 4.8 2.6 0 4.8-2.1 4.8-4.8V9.7c1.1.8 2.4 1.2 3.8 1.3V8.6c-.8 0-1.5-.2-2-.6z"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  if (norm.includes("youtube")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        {...props}
      >
        <rect width="24" height="24" rx="6" fill="#FF0000" />
        <path
          d="M10 8.5l5.5 3.5-5.5 3.5V8.5z"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  if (norm.includes("twitter") || norm.includes("x (") || norm === "x") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        {...props}
      >
        <rect width="24" height="24" rx="6" fill="#000000" />
        <path
          d="M14.7 6h2.1l-4.6 5.3 5.4 7.2h-4.3l-3.3-4.4-3.9 4.4H4l4.9-5.7L3.7 6h4.4l3 4 3.6-4zm-.7 11.2h1.2L7.9 7.2H6.6l7.4 10z"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  if (norm.includes("telegram")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        {...props}
      >
        <rect width="24" height="24" rx="6" fill="#24A1DE" />
        <path
          d="M6 11.5l10.5-4.5c.5-.2 1 .2.8.7l-1.8 8.5c-.1.6-.8.8-1.2.5l-2.8-2.1-1.3 1.3c-.2.2-.5.1-.6-.2l-.6-3.2-3-1c-.5-.2-.5-.8 0-1z"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  if (norm.includes("whatsapp")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        {...props}
      >
        <rect width="24" height="24" rx="6" fill="#25D366" />
        <path
          d="M17.5 14.3c-.3-.1-1.6-.8-1.9-.9-.3-.1-.4-.1-.6.1-.2.3-.7.9-.8 1.1-.1.1-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.8-.7-1.4-1.6-1.6-1.9-.2-.3 0-.4.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.3-.1-.5-.1-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.6-.7 1.9-1.3.2-.6.2-1.2.2-1.3 0-.2-.2-.3-.5-.4z"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  if (norm.includes("facebook")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        {...props}
      >
        <rect width="24" height="24" rx="6" fill="#1877F2" />
        <path
          d="M15.5 12.5h-2.3V20H10v-7.5H8.2V9.8H10V8.2c0-2.3 1.4-3.6 3.5-3.6 1 0 1.9.1 2.1.1v2.5h-1.4c-1.1 0-1.3.5-1.3 1.3v1.3h2.7l-.4 2.7z"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  if (norm.includes("kwai")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        {...props}
      >
        <rect width="24" height="24" rx="6" fill="#FF5000" />
        <circle cx="9.5" cy="11.5" r="3" fill="#FFFFFF" />
        <circle cx="14.5" cy="11.5" r="3" fill="#FFFFFF" />
        <path d="M12 15.5c-1.5 0-2.5-1-2.5-1s1-1 2.5-1 2.5 1 2.5 1-1 1-2.5 1z" fill="#FFFFFF" />
      </svg>
    );
  }

  if (norm.includes("twitch")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        {...props}
      >
        <rect width="24" height="24" rx="6" fill="#9146FF" />
        <path
          d="M6 5.5h12v7l-3.5 3.5H11l-2 2v-2H6v-10.5zm3.5 6.5h1.5V8.5H9.5V12zm4 0H15V8.5h-1.5V12z"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  // Fallback icon
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <rect width="24" height="24" rx="6" fill="#8B5CF6" />
      <circle cx="12" cy="12" r="5" stroke="#FFFFFF" strokeWidth="2" />
    </svg>
  );
}
