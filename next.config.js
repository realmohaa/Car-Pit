/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains:[
      'i.pinimg.com',
      'tinyurl.com',
      'upload.wikimedia.org',
      'cdn0.iconfinder.com'
    ]
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
