/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  images: {
    unoptimized: true
  },
  // output: 'export',
  eslint: {
    ignoreDuringBuilds: true
  },
  reactStrictMode: false,

  experimental: {
    esmExternals: false,
    forceSwcTransforms: true
  },

  distDir: './dist' // Changes the build output directory to `./dist/`.
}

export default nextConfig
