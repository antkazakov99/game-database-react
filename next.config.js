/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'storage.antkazakov.ru',
                port: '',
                pathname: '/**',
            }
        ]
    },

}

module.exports = nextConfig
