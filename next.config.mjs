/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: true // Enables ESM externals support. (türkçe: ESM dış bağlantıları desteğini etkinleştirir.)
  },
  typescript: {
    ignoreBuildErrors: true
  },
  distDir: './dist', // Changes the build output directory to `./dist/`.
  // output: 'export',
  eslint: {
    ignoreDuringBuilds: true
  }
}

export default nextConfig
