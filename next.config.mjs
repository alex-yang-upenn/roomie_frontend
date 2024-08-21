/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/**'
      },
      {
        protocol: 'http',
        hostname: '64.23.226.128',
        port: '1337',
        pathname: '/**'
      }
    ]
  }
};

export default nextConfig;
