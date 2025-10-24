/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/pinkie-birthday' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/pinkie-birthday/' : '',
  images: {
    unoptimized: true, // Required for static export to GitHub Pages
  },
  trailingSlash: true,
}

module.exports = nextConfig