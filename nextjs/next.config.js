/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'fixedstyle.net',
    ],
  },
  env: {
    SITE_URL: 'http://localhost:3000',
    WP_REST_API: 'http://wp:80',
  //  WP_REST_API: 'https://fixedstyle.net',
  },
}

module.exports = nextConfig
