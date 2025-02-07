/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    turbo: process.env.NODE_ENV === 'development' ? {} : undefined,
    serverActions: {},
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [480, 768, 1024, 1280, 1600, 1920, 2560, 3840],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = { fs: false };
    }
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimize = true;
    }
    return config;
  },
};

export default nextConfig;
