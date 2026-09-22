import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      { pathname: "/images/**", search: "" },
      { pathname: "/images/hero.png", search: "?v=2" },
    ],
  },
};

export default nextConfig;
