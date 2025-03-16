/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 使用standalone模式用于Vercel部署
  // 如果要生成静态文件用于其他平台部署，将此行改为 output: 'export'
  output: 'standalone',
  images: {
    unoptimized: true
  },
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        minimize: true,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendors: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
              priority: 10
            }
          }
        }
      }
    }
    return config
  }
}

module.exports = nextConfig 