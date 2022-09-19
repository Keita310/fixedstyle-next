/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SITE_URL: 'http://localhost:8000',
    WP_REST_API: 'http://localhost:8000',
  },
}

module.exports = nextConfig
