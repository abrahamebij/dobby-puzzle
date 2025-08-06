/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [new URL("https://unavatar.io/twitter/**")],
  },
};

export default nextConfig;
