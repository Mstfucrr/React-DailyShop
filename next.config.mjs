/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: true // Enables ESM externals support. (türkçe: ESM dış bağlantıları desteğini etkinleştirir.)
  },
  distDir: './dist' // Changes the build output directory to `./dist/`.
}

export default nextConfig
