/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SITE_URL: 'https://fixedstyle.net',
    WP_REST_API: 'https://fixedstyle.net',
  },
}

module.exports = nextConfig
